import BaseComponent from './BaseComponent';

export default class UiNavBarComponent extends BaseComponent {

    render() {

        return (
            <nav className='navbar navbar-dark bg-primary navbar-full'>
                <span className='navbar-brand'>Brand</span>
                <ul className='nav navbar-nav'>
                    <li className='nav-item' each='datum of getData'>
                        <a className='nav-link' href='#'>#[datum.caption] <span className='sr-only'>(current)</span></a>
                    </li>
                </ul>
            </nav>
        );

    }

    getData() {

        console.log('getData', this.data);

        return this.data;

    }

}