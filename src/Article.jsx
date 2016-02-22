import BaseComponent from './BaseComponent';

export default class UiArticleComponent extends BaseComponent {

    render() {

        return (
            <div  className='container'>
                #[getChildren]
            </div>
        );

    }

    getChildren() {

        console.log('getChildren', this);

        return this.props.children;

    }

}