import {event} from 'applugins';

let COUNTER = 0;

export default class BaseComponent {

    constructor(...opts) {

        this.internalConstructor(...opts);

    }

    internalConstructor() {}

    render() {}

    actionHandler(e, value) {

        if (typeof value === 'function') value(e);

        this.event(value).emit();

    }

    get(key) {

        //console.log('key', key, this.state);

        return key
            .split('.')
            .reduce((r, token) => {

                //console.log('r', r, token);

                return r[token];

            }, this.state);

        //return this.state[key];

    }

    put(key, value) {

        const state = this.state;

        const newState = {};

        key
            .split('.')
            .reduce((r, token, i, arr) => {

                r[token] = (i === arr.length - 1) ? value : {};

                return r;

            }, newState);

        this.update({...state, ...newState});

        this.hook(`${key}Changed`, value);

    }

    update(state) {

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

        event.on(`${key}#${this.id}`, handler);

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

            this.dataChanged(data);

        }

    }

    dataChanged(data) {

        this.hook('dataChanged', data);

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

            this.setState({data: null, error: null, dataLoading});

            this.event(key).withData(payload).action((error, data) => {

                //this.log('data loaded', error, data, dataLoading, this.state.dataLoading);

                // !!! only the last sent emit is able to be applied.

                if (dataLoading === this.get('dataLoading')) {

                    //this.log('data loaded', error, data);

                    this.setData(data, {error, dataLoading: false});

                }

            });
        }
    }

    ////////////////////////
    //// Routines
    ///////////////////////

    hook(key, ...args) {

        const cb = this.get(key) || this[key];

        return cb && cb.apply(this, args) || null;

    }

}