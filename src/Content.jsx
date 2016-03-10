import Component from '../Component.es6';

export default class UiContent extends Component {

    static TEMPLATE = (
        <div class='container'>
            <children/>
        </div>
    );
}