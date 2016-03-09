import Component from '../Component.es6';

export default class UiButton extends Component {

    initialState(props){

        return {mode: 'main', ...props}
    }

    static TEMPLATE = (
        <button
            class=':(btn btn-sm btn-(:mode) button--disabled:(:disabled))'
            click=':onClick'
        >
            <i if=':icon' class=':(fa fa-(:icon))'></i>
            <block if=':children'>:children</block>
            <block if=':caption'>:caption</block>
        </button>
    );
}