import BaseComponent from './BaseComponent';

export default class UiDropdownComponent extends BaseComponent {

    render() {

        return (
            <div className='dropdown'>
                <button className='btn btn-secondary dropdown-toggle' type='button' id='dropdownMenu1' data-toggle='dropdown' aria-haspopup='true' aria-expanded='false'>
                    Dropdown
                </button>
                <div className='dropdown-menu' aria-labelledby='dropdownMenu1'>
                    <a className='dropdown-item' href='#' each='datum of getData'>#[datum.name]</a>
                </div>
            </div>
        );

    }

    changeHandler(e) {

        this.props.onValueChanged();

    }

    getData() {

        return this.data;

    }

}