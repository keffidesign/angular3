import BaseComponent from './BaseComponent';

export default class UiInputComponent extends BaseComponent {

    render() {

        return (
            <div
                className='form-group'
            >
                <input
                    className='form-control'
                    value='value'
                    type='text'
                    placeholder='caption'
                    onChange='valueChanged'
                />
            </div>
        );

    }

    getValue() {

        //console.log('getValue', this.props.value);

        return this.props.value || '';

    }

    getCaption() {

        return this.props.caption || '';

    }

    valueChanged(e) {

        const value = e.target.value;

        this.props.onValueChanged(value);

    }

}