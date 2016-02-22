import BaseComponent from './BaseComponent';

import {Fieldset} from '../index.es6';

export default class UiFormComponent extends BaseComponent {

    render = (
        <form>
            <Fieldset
                each='m of meta'
                meta='m'
                value='value'
                onValueChanged='onFieldValueChanged'
            />
        </form>
    );

    getMeta() {

        return this.props.meta;

    }

    getValue() {

        if (!this.data) {

            console.warn('Data object is not provided.');

            this.data = {}

        }

        return this.data[this.m.id] || '';

    }

    onFieldValueChanged(value, id) {

        const data = this.state.data;

        data[id] = value;

        this.setState({data});

        this.props.onDataChanged(data);

    }

}