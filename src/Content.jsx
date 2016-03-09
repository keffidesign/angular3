import BaseComponent from '../BaseComponent.es6';

export default class UiContentComponent extends BaseComponent {

    render() {

        return (
            <div class='container'>
                <block if=':children'>:children</block>
            </div>
        );

    }

}