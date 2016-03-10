import DataComponent from '../DataComponent.es6';

export default class UiList extends DataComponent {
    static DEFAULTS = {
        emptyMessage:'Empty'
    };

    static TEMPLATE = (
        <ul class='list-group' if=':data'>
            <li class='list-group-item' each='datum of :data' click=":itemClick">
                :datum.name
            </li>
            <else if=':error'>
                <span>:Error: :error.message</span>
                <else>
                    <span>:emptyMessage</span>
                </else>
            </else>
        </ul>
    )
}