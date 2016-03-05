import BaseComponent from '../BaseComponent.es6';

export default class UiCheckboxComponent extends BaseComponent {

    render() {

        return (
            <div class='form-group'>
                <input
                    type='checkbox'
                    onChange='changeHandler'
                />
                <span class='form-group-addon' id='basic-addon3'>#[caption]</span>
            </div>
        );

    }

    getCaption() {

        return this.get('caption');

    }

    changeHandler(e) {

        const value = e && e.target.checked;

        this.put('value', value);

    }

}