// es6 need to do in every file
import React from 'react'; 

//BrowserRouter is the top level, every component can surface to it

import {getFunName} from '../helpers';

class StorePicker extends React.Component {
    
    /* one way to bind the method
    constractor(){
        super();
        this.goToStore = this.goToStore.bind(this);
    }
    or bind(this) in the onSubmit
    */
    // method is not explicit bound to component
    goToStore(event){
        event.preventDefault();
        // grap texrt from the box
        const storeId = this.storeInput.value;
        console.log(`Go To ${storeId}`);
        // transition to /store/:StorId
        this.context.router.transitionTo(`/store/${storeId}`);
    }

    render(){
        // only one parent element
        return (
            // use bind in here
            // <form className="store-selector" onSubmit={this.goToStore.bind(this)}>
            // or use arrow function
            <form className="store-selector" onSubmit={(e) => this.goToStore(e)}>
                <h2>Please Enter A Store</h2>
                { /*jsx need self closed tag
                    jsx comment format
                    no comment as first line of return, or it will have error
                */}
                <input type="text" required placeholder="Store Name" defaultValue={getFunName()}
                       ref={(input)=>{this.storeInput = input}} />
                <button type="submit">Visit Store -></button>
            </form>
        )
    }
}

StorePicker.contextTypes = {
    router: React.PropTypes.object
}


export default StorePicker;