import {event} from 'applugins';

let COUNTER = 0;

export default class BaseComponent {

    constructor(props) {

        this.state = {
            props
        };

        this.internalConstructor();

    }

    internalConstructor() {}

    render() {}

    createElement() {

        return null;

    }

    actionHandler(value) {

        this.event(value).emit();

    }

    /**
     * Gets display name of component.
     */
    getName() {

        return this.props.name || this._id;
    }

    /**
     * Gets string representation of component.
     */
    toString() {

        return this.getName();

    }

    getTypeName() {

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

        return event(`log://info`, {value: `${this.id}: ${message}`, data}).action();

    }

    event(...sources) {

        return event(...sources);

    }

    emit(key, params, cb) {

        event(key, {data: params}).action(cb);

    }

    promit(key, params) {

        return event(key, {data: params}).promise();

    }

}