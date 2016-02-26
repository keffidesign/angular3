import BaseComponent from './BaseComponent';

export default class UiTitleComponent extends BaseComponent {

    render() {

        return (
            <h1>#[value]</h1>
        );

    }

    getValue() {

        return this.get('value');

    }

}