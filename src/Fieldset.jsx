import BaseComponent from '../BaseComponent.es6';

import {Input, Checkbox, Dropdown} from '../index.es6';

const STRING_TYPE = 'string';

const BOOLEAN_TYPE = 'boolean';

const ENUMERABLE_TYPE = 'enum';

export default class UiFieldsetComponent extends BaseComponent {

    render() {

        return (
            <fieldset class="form-group">
                <Input
                    if='ifInput'
                    testprop='propstest'
                    caption='caption'
                    valueChanged='valueChanged'
                    value='value'
                />
                <Checkbox
                    if='ifBoolean'
                    caption='caption'
                    valueChanged='valueChanged'
                />
                <Dropdown
                    if='ifEnumerable'
                    dataFrom='dataFrom'
                    caption='caption'
                    valueChanged='valueChanged'
                />
            </fieldset>
        );

    }

    ifInput() {

        const type = this.get('meta.type');

        return type === STRING_TYPE || type === 'number';

    }

    ifBoolean() {

        return this.get('meta.type') === BOOLEAN_TYPE;

    }

    ifEnumerable() {

        return this.get('meta.type') === ENUMERABLE_TYPE;

    }

    getCaption() {

        return this.get('meta.caption') || '';

    }

    getValue() {

        return this.get('value') || '';

    }

    getDataFrom() {

        return this.get('meta.dataFrom');

    }

    valueChanged(value) {

        const id = this.get('meta.id');

        this.hook('fieldValueChanged', value, id);

    }

}