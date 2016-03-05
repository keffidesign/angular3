import BaseComponent from '../BaseComponent.es6';

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