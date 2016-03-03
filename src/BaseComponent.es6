import {event} from 'applugins';

let COUNTER = 0;

export default class BaseComponent {

    constructor(...opts) {

        this._id = ++COUNTER;

        this.$ = {}; // memoization cache

        this.internalConstructor(...opts);

    }

    internalConstructor() {
    }

    render() {

        return this.constructor.TEMPLATE;
    }

    get(_key) {

        let value = this.$[_key] || this.state[_key];

        if (value === undefined) {
            const keys = _key.split('.');
            if (keys.length>1){
                const key = keys.shift();
                let rr = this.$[key] || this.state[key];
                if (rr){
                    for (let k of keys) {
                        value = rr[k];
                        // console.log('key', key, rr, keys, k , value);
                        if (!value) {
                            break;
                        }
                        rr = value;
                    }
                }
            }
        }
        return value;// TODO this.$[_key] =
    }

    put(key, value) {

        const state = this.state;

        this.update({...state, [key]: value});
    }

    setState(newState, cb) {
        this.$ = {};
        Object.assign(this, newState);
        cb && cb();
    }

    update(newState, cb) {

        const prevState = this.state;

        const changedKeys = Object.keys(newState).filter(key=>(prevState[key]!==newState[key]));

        this.setState(newState, (err)=>{

            //console.log('changes', newState, prevState, Object.keys(newState));

            for (let key of changedKeys) {

                //console.log('changes', key, newState[key]);

                this.hook(`${key}Changed`, newState[key]);
            }

            cb && cb();
        });
    }

    /**
     * Lifecycle hooks
     */

    init() {

        (this.get('dataDependsOn') || '').split(';').map(e => e.trim()).filter(e => e).forEach(
            (key) => this.addEventListener(key, (params, cb) => {

                this.reloadData();
                cb();
            })
        );

        if (!this.get('dataPreventInitialLoad')) {

            this.reloadData();

        }

    }

    done() {

        this.isDone = true;

        event.off(`#${this._id}`);
    }

    /**
     * Gets display name of component.
     */
    _name() {

        return this.name || this._id;
    }

    /**
     * Gets string representation of component.
     */
    toString() {

        return this._name();
    }

    typeName() {

        const fn = this.constructor;

        return fn.displayName || fn.name || /^function\s+([\w\$]+)\s*\(/.exec(fn.toString())[1];
    }

    uniqueKey() {

        return `C${COUNTER++}`;
    }

    /**
     * Adds event handlers with this ownership.
     *
     * @param ev
     */
    addEventListener(key, handler) {

        event.on(`${key}#${this._id}`, handler);
    }

    log(message, ...data) {

        return event(`log://info`, {value: `${this}: ${message}`, data}).action();

    }

    event(...sources) {

        return event(...sources);

    }

    setData(data, extraState) {

        if (!this.isDone) {

            this.setState({data, ...extraState, dataChangedCounter: (this.get('dataChangedCounter') || 0) + 1});
        }

    }

    getData() {

        return this.get('data');
    }

    hasData() {

        return this.get('data') != undefined;
    }

    reloadData(key = this.get('dataFrom'), payload = this.get('dataFromPayload') || {}) {

        if (key) {

            const dataLoading = this.uniqueKey();

            this.setState({data: null, error: null, dataLoading}, () => this.loadData(key, payload, dataLoading));
        }
    }

    loadData(key, payload, dataLoading) {

        this.event(key).withData(payload).action((error, data) => {

            //this.log('data loaded', error, data, dataLoading, this.state.dataLoading);

            // !!! only the last  sent emit is able to be applied.

            if (dataLoading === this.get('dataLoading')) {

                //this.log('data loaded', error, data);

                this.setData(data, {error, dataLoading: false});

            }

        });
    }

    ////////////////////////
    //// Routines
    ///////////////////////

    hook(key, ...args) {

        const cb = this.get(key) || this[key];

        return cb && cb.apply(this, args) || null;
    }

}