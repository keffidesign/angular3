import BaseComponent from './BaseComponent';

export default class UiListComponent extends BaseComponent {

    render() {

        return (
            <ul className='list-group' if='hasData'>
                <li className='list-group-item' each='datum of data'>
                    #[datum.name]
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

    hasData() {

        return this.data != undefined;

    }

    hasError() {

        return this.error != undefined;

    }

    getData() {

        return this.data;

    }

}