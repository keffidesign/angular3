import BaseComponent from './BaseComponent';

export default class UiNavBarComponent extends BaseComponent {

    render() {

        return (
            <nav class='navbar navbar-fixed-bottom bg-inverse'>
                <span class='text-xs-center'>#[caption]</span>
            </nav>
        );

    }

    getCaption() {

        return this.get('caption') || 'Copyright (c) 2016 Brand';

    }

}