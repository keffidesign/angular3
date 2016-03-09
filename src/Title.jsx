import Component from '../Component.es6';

export default class UiTitleComponent extends Component {

    render() {

        return (
            <h1>#[value]</h1>
        );

    }

    getValue() {

        return this.get('value');

    }

}