import BaseComponent from './BaseComponent';

export default class UiTitleComponent extends BaseComponent {

    render() {

        return (
            <h1>#[props.value]</h1>
        );

    }

}