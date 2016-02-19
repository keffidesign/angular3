import BaseComponent from './BaseComponent';

export default class UiTableComponent extends BaseComponent {

    render() {

        return (
            <table className='table'>
                <thead>
                    <tr>
                        <th each='column of getColumns'>#[column.caption]</th>
                    </tr>
                </thead>
                <tbody>
                    <tr each='datum of getData'>
                        <td each='column of getColumns'>#[getCellValue]</td>
                    </tr>
                </tbody>
            </table>
        );

    }

    getCellValue() {

        //datum[column.id]

        return this.datum[this.column.id];

    }

    getColumns() {

        return this.props.meta;

    }

    getData() {

        return this.data;

    }

}