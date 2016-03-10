import {event} from 'applugins';
import {functionName, capitalize} from './Utils.es6';

let COUNTER = 0;

export default class Component {

    constructor(...opts) {

        this._id = this.typeName() + (++COUNTER);

        this.$ = {}; // memoization cache

        this.internalConstructor(...opts);
    }

    internalConstructor(opts) {

        this.state = {...this.getDefaults(), ...this.props};
    }

    getDefaults() {

        let t =this;
        while(t){
            let r = t.constructor.DEFAULTS;
            if (r) {
                return r;
            }
            t = t.__proto__;
        }
        return {};
    }

    ////////////////////////
    //// Lifecycle hooks
    ///////////////////////

    init() {

    }

    done() {

        this.isDone = true;

        event.off(`#${this._id}`);

        this.$ = null;
    }

    render() {

        return this.constructor.TEMPLATE;
    }

    ////////////////////////
    //// Stateful
    ///////////////////////

    get(_key) {

        const fnKey = `get${capitalize(_key)}`;

        const factory = this.state[fnKey] || this[fnKey];

        let value = factory || this.$[_key] || this.state[_key] || this[_key];

        //this.log('get0:',_key, value,  this);

        if (typeof value === 'function') {

            value = this.$[_key] || (this.$[_key] = value.bind(this));

            if (factory) {
                value = value();
            }
        }

        if (value === undefined) {
            const keys = _key.split('.');

            if (keys.length > 1) {
                const key = keys.shift();
                let rr = this.$[key] || this[key] || this.state[key];

                //this.log('get:',key, rr,  this);

                if (rr) {
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

    put(key, value, cb) {

        const state = this.state;

        this.update({...state, [key]: value}, cb);
    }

    setState(newState, cb) {
        //this.$ = {};
        Object.assign(this.state, newState);
        cb && cb();
    }

    update(newState, cb) {

        if (newState) {

            const prevState = this.state;

            const changedKeys = Object.keys(newState).filter(key=>(prevState[key] !== newState[key]));

            this.setState(newState, (err)=> {

                //console.log('changes', newState, prevState, Object.keys(newState));

                for (let key of changedKeys) {

                    //console.log('changes', key, newState[key]);

                    this.hook(`${key}Changed`, newState[key]);
                }

                cb && cb();
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

    _name() {

        return this.name || this._id;
    }

    typeName() {

        return functionName(this.constructor);
    }

    uniqueKey() {

        return `C${COUNTER++}`;
    }


    event(...sources) {

        return event(...sources);
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

        //return event(`log://info`, {value: `${this}: ${message}`, data}).action();
        console.log(this._name(), message, ...data);

        return message;
    }

    /**
     * Gets string representation of component.
     */
    toString() {

        return this._name();
    }
}