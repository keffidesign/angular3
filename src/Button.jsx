import Component from '../Component.es6';

export default class UiButton extends Component {

    static DEFAULTS = {mode: 'main'};

    static TEMPLATE = (
        <button
            class=':button button--(:mode)'
            disabled=":disabled"
            click=':onClick'
        >
            <i if=':icon' class=':(fa fa-(:icon))'></i>
            <children/>
            <block if=':caption'>:caption</block>
        </button>
    );
}