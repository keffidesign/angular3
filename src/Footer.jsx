import Component from '../Component.es6';

export default class UiNavBarComponent extends Component {

    render() {

        return (
            <nav class='navbar navbar-fixed-bottom bg-inverse'>
                <span class='text-xs-center'>:caption</span>
            </nav>
        );

    }

    getCaption() {

        return this.get('props.caption') || 'Copyright (c) 2016 Brand';

    }

}