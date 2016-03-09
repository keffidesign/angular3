import BaseComponent from '../BaseComponent.es6';

export default class UiInputComponent extends BaseComponent {

    render() {

        return (
            <div class='form-group'>
                <input
                    class='form-control'
                    type='text'
                    value=':value'
                    placeholder=':caption'
                    change=':change'
                />
            </div>
        );

    }

    change(e) {

        const value = e && e.target.value;

        this.put('value', value);

    }

}