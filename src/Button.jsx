import BaseComponent from './BaseComponent';

export default class UiButtonComponent extends BaseComponent {

    render() {

        return (
            <button
                className='getClassName'
                onClick='clickHandler'
                //onClick='#[props.action]'
            >
                #[props.caption]
            </button>
        );

    }

    getClassName() {

        const mode = this.props.mode;

        return `btn btn-sm${mode ? ` btn-${mode}`: ''}`

    }

    clickHandler() {

        this.props.onClick();

    }

}