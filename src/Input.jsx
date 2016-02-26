import BaseComponent from './BaseComponent';

export default class UiInputComponent extends BaseComponent {

    render() {

        return (
            <div class='form-group'>
                <input
                    class='form-control'
                    type='text'
                    value='value'
                    placeholder='caption'
                    onChange='valueChanged'
                />
            </div>
        );

    }

    getValue() {

        return this.get('value') || '';

    }

    getCaption() {

        return this.get('caption') || '';

    }

    valueChanged(e) {

        const value = e && e.target.value;

        this.put('value', value);

    }

}