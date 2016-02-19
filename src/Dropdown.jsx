import BaseComponent from './BaseComponent';

export default class UiDropdownComponent extends BaseComponent {

    render() {

        //open
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

        //return (
        //    <select
        //        onChange='onChangeHandler'
        //    >
        //        <option value='#[datum.id]' each='datum of getData'>#[datum.name]</option>
        //    </select>
        //);

    }

    onChangeHandler(e) {

        console.log('_inner:onChangeHandler', e, this);

        this.props.onValueChanged();

    }

    getData() {

        console.log('data', this.data);

        return this.data;

    }

}