import Component from '../Component.es6';

export default class UiInputComponent extends Component {

    render() {

        return (
            <div class='form-group'>
                <input
                    class='form-control'
                    type='text'
                    value='value'
                    placeholder='caption'
                    onChange='changeHandler'
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

    changeHandler(e) {

        const value = e && e.target.value;

        this.put('value', value);

    }

}