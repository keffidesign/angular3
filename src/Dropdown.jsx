import Component from '../Component.es6';

export default class UiDropdownComponent extends Component {

    static TEMPLATE = (
        <div if=':hasData' class='dropdown'>
            <button
                class='btn btn-secondary dropdown-toggle'
                type='button'
                id='dropdownMenu1'
                data-toggle='dropdown'
                aria-haspopup='true'
                aria-expanded='false'
            >
                :caption
            </button>
            <div class='dropdown-menu' aria-labelledby='dropdownMenu1'>
                <button
                    click=':change'
                    class="dropdown-item"
                    type="button"
                    data-value='datum.id'
                    each='datum of :data'
                >
                    :datum.name
                </button>
            </div>
        </div>
    );

    getCaption() {

        const value = this.get('value');

        const data = this.get('data');

        const current = data.find(d => d.id === value);

        return current && current.name || 'Dropdown';

    }

    change(e) {

        const value = e.currentTarget.getAttribute('data-value');

        this.put('value', value);

    }

}