import Component from '../Component.es6';

export default class UiContent extends Component {

    render() {

        return (
            <div class='container'>
                <block if=':children'>:children</block>
            </div>
        );

    }

}