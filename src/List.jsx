import Component from '../Component.es6';

export default class UiListComponent extends Component {

    render() {

        return (
            <ul class='list-group' if='hasData'>
                <li class='list-group-item' each='datum of :data'>
                    :datum.name
                </li>
                <else if='hasError'>
                    <span>Error occurred</span>
                    <else>
                        <span>There is no data</span>
                    </else>
                </else>
            </ul>
        );

    }

    hasError() {

        return this.get('error') != undefined;

    }

}