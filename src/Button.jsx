import BaseComponent from './BaseComponent';

export default class UiButtonComponent extends BaseComponent {

    render() {

        return (
            <button
                class='className'
                onClick='clickHandler'
            >
                #[props.caption]
            </button>
        );

    }

    getClassName() {

        const mode = this.get('mode');

        return `btn btn-sm${mode ? ` btn-${mode}`: ''}`

    }

    clickHandler(e) {

        this.hook('onClick', e);

    }

}