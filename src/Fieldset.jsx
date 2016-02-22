import BaseComponent from './BaseComponent';

import {Input, Checkbox, Dropdown} from '../index.es6'

const STRING_TYPE = 'string';

const BOOLEAN_TYPE = 'boolean';

const ENUMERABLE_TYPE = 'enum';

export default class UiFieldsetComponent extends BaseComponent {

    render() {

        //console.log('RENDER', this);

        return (
            <fieldset className="form-group">
                <Input
                    if='ifInput'
                    caption='meta.caption'
                    onValueChanged='valueChanged'
                    value='value'
                />
                <Checkbox
                    if='ifBoolean'
                    caption='meta.caption'
                    onValueChanged='valueChanged'
                />
                <Dropdown
                    if='ifEnumerable'
                    caption='meta.caption'
                />
            </fieldset>
        );

    }

    ifInput() {

        return this.props.meta.type === STRING_TYPE || this.props.meta.type === 'number';

    }

    ifBoolean() {

        return this.props.meta.type === BOOLEAN_TYPE;

    }

    ifEnumerable() {

        return this.props.meta.type === ENUMERABLE_TYPE;

    }

    getMeta() {

        return this.props.meta;

    }

    getValue() {

        //console.log('getValue:fieldset', this, this.props.value);

        return this.props.value || '';

    }

    valueChanged(value) {

        const id = this.props.meta.id;

        //console.log('onValueChanged:fieldset', this, id);

        this.props.onValueChanged(value, id);

    }

}