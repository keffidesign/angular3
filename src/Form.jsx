import BaseComponent from '../BaseComponent.es6';

import {Fieldset} from '../index.es6';

export default class UiFormComponent extends BaseComponent {

    render() {

        return (
            <form>
                <Fieldset
                    each='m of meta'
                    meta='m'
                    value='value'
                    fieldValueChanged='fieldValueChanged'
                 />
            </form>
        );
    }

    getMeta() {

        return this.props.meta;

    }

    getValue() {

        const data = this.get('data');

        const id = this.get('m.id');

        return data && data[id] || '';

    }

    fieldValueChanged(value, id) {

        let data = this.get('data');

        if (!data) {

            data = {};

            this.put('data', data);

        }

        data[id] = value;

        this.hook('dataChanged', data);

    }

}