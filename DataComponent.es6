import Component from './Component.es6';

export default class DataComponent extends Component {

    init() {

        super.init();

        (this.get('dataDependsOn') || '').split(';').map(e => e.trim()).filter(e => e).forEach(

            (key) => this.addEventListener(key, (params, cb) => {

                this.reloadData();

                cb();
            })
        );

        if (!this.get('dataPreventInitialLoad')) {

            this.reloadData();

        }
    }

    ////////////////////////
    //// Data driven
    ///////////////////////

    setData(data, extraState) {

        if (!this.isDone) {

            this.setState({data, ...extraState, dataChangedCounter: (this.get('dataChangedCounter') || 0) + 1});
        }
    }

    hasData() {

        return this.get('data') != undefined;
    }

    reloadData(key = this.get('dataFrom'), payload = this.get('dataFromPayload') || {}) {

        if (key) {

            const dataLoading = this.uniqueKey();

            this.setState({data: null, error: null, dataLoading}, () => this.loadData(key, payload, dataLoading));
        }
    }

    loadData(key, payload, dataLoading) {

        this.event(key).withData(payload).action((error, data) => {

            //this.log('data loaded', error, data, dataLoading, this.state.dataLoading);

            // !!! only the last  sent emit is able to be applied.

            if (dataLoading === this.get('dataLoading')) {

                //this.log('data loaded', error, data);

                this.setData(data, {error, dataLoading: false});

            }

        });
    }

}