import BaseComponent from './BaseComponent';

export default class UiNavBarComponent extends BaseComponent {

    render() {

        return (
            <nav className='navbar navbar-fixed-bottom bg-inverse'>
                <span className='text-xs-center'>Copyright (c) 2016 Brand</span>
            </nav>
        );

    }

}