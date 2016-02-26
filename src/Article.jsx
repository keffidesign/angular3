import BaseComponent from './BaseComponent';

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