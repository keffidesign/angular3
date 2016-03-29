import event from 'evest';
import {functionName, capitalize, getter, getStatic} from './utils.es6';
import {Pipes} from './Pipes.es6';

let COUNTER = 0;

export default class Component {

    constructor(...opts) {

        this._id = this.typeName() + (++COUNTER);

        this.$ = {}; // memoization cache

        this.registerPipes();

        this.internalConstructor(...opts);
    }

    internalConstructor() {
    }

    getDefaults(extra) {

        const extraInitials = (extra) && Object.keys(extra).reduce((r, k)=> {
                if (k.startsWith('initial')) {
                    r[k[7].toLowerCase() + k.slice(8)] = extra[k]
                }
                return r;
            }, {});

        return {...getStatic(this, 'DEFAULTS'), ...extra, ...extraInitials};
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

        this.state = null;
    }

    render() {

        return getStatic(this, 'TEMPLATE');
    }

    ////////////////////////
    //// Stateful
    ///////////////////////

    get(key) {

        // 1. Getter
        let value = this[`get${capitalize(key)}`];
        if (value !== undefined) {

            return value.call(this);
        }

        // 2. pre-cached
        value = this.$[key];
        if (value !== undefined) {
            return value;
        }

        // 3. own property
        value = this[key];
        if (value !== undefined) {

            if (typeof value === 'function') {

                value = this.$[key] = value.bind(this);
            }

            return value;
        }

        // 4. from state
        value = this.getState(key);
        if (value !== undefined) {
            return value;
        }

        return undefined;
    }

    set(key, value, cb) {

        this.update({[key]: value}, cb);
    }

    put(key, value, cb) {

        this.update({[key]: value}, cb);
    }

    getState(key) {

        return this.state && getter.call(this.state, key);
    }

    setState(newState, cb) {

        this.state = {...this.state, ...newState};

        cb && cb();
    }

    update(delta, cb) {

        if (delta) {

            const prevState = this.state;

            const changedKeys = prevState
                ? Object.keys(delta).filter(key=>(prevState[key] !== delta[key]))
                : Object.keys(delta);

            if (changedKeys.length){

                this.setState(delta, (err)=> {

                    //console.log('changes', newState, prevState, Object.keys(newState));

                    for (let key of changedKeys) {

                        //console.log('changes', key, newState[key]);

                        this.hook(`${key}Changed`, delta[key]);
                    }

                    cb && cb();
                });

            } else {
                cb && cb();
            }

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

    event(source) {

        return event(source);
    }

    /**
     * Adds event handlers with this ownership.
     *
     * @param ev
     */
    addEventListener(key, handler) {

        event.on(`${key}#${this._id}`, handler);
    }

    registerPipes() {

        if (!this.pipes) this.pipes = new Map();

        Object
            .getOwnPropertyNames(this.__proto__)
            .filter(p => p.endsWith('Pipe'))
            .map(p => this.pipes.set(p.slice(0, -4), this[p]));

    }

    transform(value, pipes) {

        return pipes.reduce((v, p) => this.pipes.has(p) ? this.pipes.get(p)(v) : Pipes.transform(v, p), value);

    }

    updateOnClick(ev) {

        this.update({...ev.currentTarget.dataset});
    }

    getClicker(key) {

        let fn = this.get(key) || (ev=>{this.log(`No click handler ${key}`)})

        return this.$[key] || (this.$[key] = (ev=>fn(ev, ev.currentTarget.dataset)));
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

        return this.name();
    }
}