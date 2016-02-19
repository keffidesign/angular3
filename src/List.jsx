import BaseComponent from './BaseComponent';

export default class UiListComponent extends BaseComponent {

    render() {

        return (
            <ul className='list-group' if='hasData'>
                <li className='list-group-item' each='datum of getData'>
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

        //return false;

        console.log('hasData', this,  this.data, this.data != undefined);

        return this.data != undefined;

    }

    hasError() {

        console.log('hasError', this, this.error, this.error != undefined);

        //return true;

        return this.error != undefined;

    }

    getData() {

        console.log('getData', this, this.data);

        return this.data;

    }

    getString() {

        return 'getStringTest';

    }

}