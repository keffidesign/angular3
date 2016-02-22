import BaseComponent from './BaseComponent';

export default class UiTableComponent extends BaseComponent {

    render() {

        return (
            <table className='table'>
                <thead>
                    <tr>
                        <th each='column of columns'>#[column.caption]</th>
                    </tr>
                </thead>
                <tbody>
                    <tr each='datum of data'>
                        <td each='column of columns'>#[cellValue]</td>
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