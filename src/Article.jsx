import Component from '../Component.es6';

export default class UiArticle extends Component {

    static TEMPLATE = (
            <div  class='container'>
                <children/>
            </div>
        );

}