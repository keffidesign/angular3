import {functionName, capitalize, getter, getStatic} from './utils.es6';
import {Pipes} from './Pipes.es6';
import event from 'evest';

let COUNTER = 0;

/**
 * The base component ancestor.
 */
export default class Component {

    constructor(...opts) {

        // unique identity
        this._id = this.typeName() + (++COUNTER);

        // memoization cache
        this.$ = {};

        this.registerPipes();

        this.internalConstructor(...opts);
    }

    /**
     * Used by platform adapter to extend constructor logic
     */
    internalConstructor() {
    }

    /**
     * Produces initial state
     */
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

        this.removeAllEventListeners();

        this.$ = null;

        this.state = null;
    }

    render() {

        return getStatic(this, 'TEMPLATE');
    }
    ////////////////////////
    //// Events
    ///////////////////////

    event(source) {

        return event(source);
    }


    emit(source, cb) {

        return this.event(source).emit(cb);
    }

    action(source, cb) {

        return this.event(source).action(cb);
    }

    /**
     * Adds event handlers with this ownership.
     *
     * @param ev
     */
    addEventListener(key, handler) {

        event.on(`${key}#${this._id}`, handler);
    }

    removeAllEventListeners() {

        event.off(`#${this._id}`);
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

                    this.log('changes',changedKeys, delta, prevState);

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

    hook(key, ...args) {

        const cb = this.get(key);

        try{

            return cb && cb.apply(this, args) || null;

        } catch(ex){

            this.logError(`Error in ${key} hook`, ex);
        }

    }

    getClicker(key) {

        let fn = this.get(key) || (ev=>{this.log(`No click handler ${key}`)})

        return this.$[key] || (this.$[key] = (ev=>fn(ev, ev.currentTarget.dataset)));
    }



    ////////////////////////
    //// Routines
    ///////////////////////

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

    getRouteParams() {

        return this.getState('params')||{};
    }

    updateOnClick(ev) {

        this.update({...ev.currentTarget.dataset});
    }

    log(message, ...data) {

        //return event(`log://info`, {value: `${this}: ${message}`, data}).action();
        console.log(this.name(), message, ...data);

        return message;
    }
    logError(message, ...data) {

        console.error(`${this.name()}: ${message}`, ...data);

        return message;
    }
    ////////////////////////
    //// Attribution
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

    /**
     * Gets string representation of component.
     */
    toString() {

        return this.name();
    }
}