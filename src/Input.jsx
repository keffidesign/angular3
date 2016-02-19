import BaseComponent from './BaseComponent';

export default class UiInputComponent extends BaseComponent {

    render() {

        return (
            <div
                className='form-group'
            >
                <input
                    type='text'
                    className='form-control'
                    placeholder='Recipient`s username'
                    onChange='onChangeHandler'
                />
            </div>
        );

    }

    onChangeHandler(e) {

        const value = e.target.value;

        this.props.onValueChanged(value);

    }

}