import BaseComponent from './BaseComponent';

export default class UiListComponent extends BaseComponent {

    render() {

        return (
            <ul class='list-group' if='hasData'>
                <li class='list-group-item' each='datum of data'>
                    #[datumName]
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

    getDatumName() {

        return this.get('datum.name');

    }

    hasError() {

        return this.get('error') != undefined;

    }

}