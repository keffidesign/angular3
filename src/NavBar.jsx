import BaseComponent from './BaseComponent';

export default class UiNavbarComponent extends BaseComponent {

    render() {

        return (
            <nav class='navbar navbar-dark bg-primary navbar-full'>
                <span class='navbar-brand'>Brand</span>
                <ul if='hasData' class='nav navbar-nav'>
                    <li class='nav-item' each='datum of data'>
                        <a class='nav-link' href='#'>#[datumCaption] <span class='sr-only'>(current)</span></a>
                    </li>
                </ul>
            </nav>
        );

    }

    getDatumCaption() {

        return this.get('datum.caption');

    }

}