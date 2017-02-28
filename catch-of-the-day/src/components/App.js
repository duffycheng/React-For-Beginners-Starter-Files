import React from 'react'; 

// 注意相對路徑位置
import Header from './Header';
import Order from './Order';
import Inventory from './Inventory';
import Fish from './Fish';
import sampleFishes from '../sample-fishes';
import base from "../base";

class App extends React.Component {
    constructor(){
        super();
        
        this.addFish = this.addFish.bind(this);
        this.loadSamples = this.loadSamples.bind(this);
        this.addToOrder = this.addToOrder.bind(this);
        this.updateFish = this.updateFish.bind(this);
        this.removeFish = this.removeFish.bind(this);
        this.removeOrder = this.removeOrder.bind(this);

        // inintial state
        // fish save to Firebase, order in localStorage
        this.state = {
            fishes: {},
            order:{}
        }
    }

    //sync with one store
    componentWillMount(){
        // before <app> is render
        this.ref = base.syncState(`${this.props.params.storeId}/fishes`, 
        {
            context: this,
            state: 'fishes'
        });
        //check if there is order save in localStorage
        const localStorageRef = localStorage.getItem(`order-${this.props.params.storeId}`);
        if(localStorageRef){
            //update component's order state
            this.setState({
                order: JSON.parse(localStorageRef)
            });
        }
    }
    componentWillUnmount(){
        base.removeBinding(this.ref);
    }

    // when state, props changes 
    componentWillUpdate(nextProps, nextState){
        localStorage.setItem(`order-${this.props.params.storeId}`, JSON.stringify(nextState.order));
    }

    addFish(fish){
        //update state - copy and add
        // copy a state
        const fishes = {...this.state.fishes};
        // add in new fish
        const timestamp = Date.now();
        fishes[`fish-${timestamp}`] = fish;
        // set state, React won't watch state, we have to update it
        // this.setState({fishes: fishes});
        // es6 簡寫
        this.setState({fishes});
    }

    updateFish(key, fish){
        const fishes = {...this.state.fishes};
        fishes[key] = fish;
        this.setState({fishes})
    }

    removeFish(key){
        const fishes = {...this.state.fishes};
        //hook up to firebse, can not just use delete
        // delete fishes[key];
        console.log({key});
        console.log(fishes[key]);
        fishes[key] = null;
        this.setState({fishes});

    }

    addToOrder(key){
        // copy
        const order = {...this.state.order};
        // update or add
        order[key] = order[key] + 1 || 1;
        //update state
        this.setState({order});
    }

    removeOrder(key){
        const order = {...this.state.order};
        delete order[key];
        this.setState({order});

    }

    loadSamples(){
        this.setState({
            fishes: sampleFishes
        });
    }
    
    render(){
        return (
            <div className="catch-of-the-day">
                <div className="menu">
                    <Header tagline="Fresh Seafood Market" />
                    <ul className="list-of-fishes">
                        {/* use unique key for each fish, so react know which one to update 
                            key is for React, index for Fish component to figure out wich fish to do the action
                        */}
                        {
                            Object
                                .keys(this.state.fishes)
                                .map(key => <Fish key={key} index={key} details={this.state.fishes[key]}
                                    addToOrder={this.addToOrder} />)
                        }
                    </ul>
                </div>
                <Order 
                    fishes={this.state.fishes} 
                    order={this.state.order}
                    params={this.props.params}
                    removeOrder={this.removeOrder} />
                <Inventory 
                    addFish={this.addFish} 
                    updateFish={this.updateFish}
                    removeFish={this.removeFish}
                    loadSamples={this.loadSamples} 
                    fishes={this.state.fishes}
                    storeId={this.props.params.storeId} />
            </div>
        )
    }
}

App.propTypes = {
    params: React.PropTypes.object.isRequired
}

export default App;