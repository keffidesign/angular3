import Component from '../Component.es6';

import {Fieldset} from '../index.es6';

export default class UiFormComponent extends Component {

    render() {

        return (
            <form>
                <Fieldset
                    each='m of :meta'
                    meta=':m'
                    value=':value'
                    fieldValueChanged=':change'
                 />
            </form>
        );
    }

    getValue() {

        const data = this.get('data');

        const id = this.get('m.id');

        return data && data[id] || '';

    }

    change(value, id) {

        const data = this.get('data') || {};

        data[id] = value;

        this.put('data', data);

    }

}