import Component from '../Component.es6';

function addListeners(){

    const keys={};
    let t = this.constructor.prototype, tt;
    while(t){
        Object.getOwnPropertyNames(t)
            .filter(key=>(key.substring(0,2)==='on'))
            .forEach(key=>(keys[key] = (`${key[2].toLowerCase()}${key.substring(3)}`).replace('_','://').replace('://any','://*')));
        //console.log(t,Object.getOwnPropertyNames(t),Object.keys(t))
        tt = t.__proto__;
        t = (t===tt)?null:tt;
    }

    Object.keys(keys).forEach(key => this.addEventListener(`${keys[key]}`, this[key].bind(this)));

    return true;
}

/**
 * Page base class.
 */
export default class Page extends Component {

    init() {

        this::addListeners();

        super.init();
    }

    getRoutingParams() {

        return this.props.routingParams || this.context.router.getCurrentParams();
    }

    getRoutingParam(key) {

        return this.getRoutingParams()[key];
    }

    getDocumentId() {

        return this.getRoutingParam('document');
    }

    navigate(path, params) {

        return this.event(`ui://navigate/${path}`,{params}).action();
    }
}