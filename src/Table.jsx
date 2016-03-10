import DataComponent from '../DataComponent.es6';

export default class UiTable extends DataComponent {

    static TEMPLATE = (

        <table class='table'>
            <thead>
                <tr>
                    <th each='column of :meta'>:column.caption</th>
                </tr>
            </thead>
            <tbody>
                <tr each='datum of :data'>
                    <td each='column of :meta'>:cellValue</td>
                </tr>
            </tbody>
        </table>
    );

    getCellValue() {

        const key = this.get('column.id');

        return this.get(`datum.${key}`);
    }
}