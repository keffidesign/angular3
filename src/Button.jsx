import Component from '../Component.es6';

export default class UiButton extends Component {

    initialState(props) {

        return {mode: 'main', ...props}
    }

    getTopClass() {

        return `button button--${this.get('mode')} ${this.get('disabled') ? 'button--disabled':''}`;
    }

    static TEMPLATE = (
        <button
            class=':topClass'
            click=':onClick'
        >
            <i if=':icon' class=':fa fa-(:icon)'></i>
            <block if=':caption'>:caption</block>
        </button>
    );
}