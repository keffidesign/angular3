import BaseComponent from '../BaseComponent.es6';

export default class UiArticleComponent extends BaseComponent {

    render() {

        return (
            <div  class='container'>
                #[children]
            </div>
        );

    }

    getChildren() {

        return this.get('children');

    }

}