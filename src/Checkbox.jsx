import Component from '../Component.es6';

export default class UiCheckboxComponent extends Component {

    static TEMPLATE = (
        <div class='form-group'>
            <input
                type='checkbox'
                chage=':change'
            />
            <span class='form-group-addon' id='basic-addon3'>:caption</span>
        </div>
    );

    change(e) {

        const value = e && e.target.checked;

        this.put('value', value);
    }

}