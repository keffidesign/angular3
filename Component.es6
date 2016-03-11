import {event} from 'applugins';
import {functionName, capitalize, getter} from './utils.es6';

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

        let t = this;
        while (t) {
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

    get(key) {

        let value = this[`get${capitalize(key)}`];
        if (value !== undefined) {

            return value.call(this);
        }

        value = this.$[key];
        if (value !== undefined) {
            return value;
        }

        value = this[key];
        if (value !== undefined) {

            if (typeof value === 'function') {

                value = this.$[key] = value.bind(this);
            }

            return value;
        }

        return this.getState(key);
    }

    put(key, value, cb) {

        const state = this.state;

        this.update({...state, [key]: value}, cb);
    }

    getState(key) {

        return getter.call(this.state, key);
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

    name() {

        return this._name || this._id;
    }

    typeName() {

        return functionName(this.constructor);
    }

    uniqueKey() {

        return `C${COUNTER++}`;
    }

    hook(key, ...args) {

        const cb = this.get(key);

        return cb && cb.apply(this, args) || null;
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
        console.log(this.name(), message, ...data);

        return message;
    }

    /**
     * Gets string representation of component.
     */
    toString() {

        return this._name();
    }
}