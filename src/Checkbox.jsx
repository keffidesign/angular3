import BaseComponent from './BaseComponent';

export default class UiCheckboxComponent extends BaseComponent {

    render() {

        return (
            <div
                className='form-group'
            >
                <input
                    type='checkbox'
                    onChange='onChangeHandler'
                />
                <span class='form-group-addon' id='basic-addon3'>#[props.caption]</span>
            </div>
        );

    }

    onChangeHandler(e) {

        const value = e.target.checked;

        this.props.onValueChanged(value);

    }

}