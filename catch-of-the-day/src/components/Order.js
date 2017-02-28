import React from 'react'; 
import {formatPrice} from '../helpers';
import CSSTransitionGroup from 'react-addons-css-transition-group';

class Order extends React.Component {

    constructor(){
        super();
        this.renderOrder = this.renderOrder.bind(this);
    }

    // render function
    // 當程式碼有點多又不到抽成component時使用
    renderOrder(key){
        const fish = this.props.fishes[key];
        const count = this.props.order[key];
        const removeButton = <button onClick={()=>this.props.removeOrder(key)}>&times;</button>;

        if(!fish || fish.status === 'unavailable'){
            return <li key={key}>Sorry, {fish ? fish.name : 'fish'} is no longer available {removeButton}</li>
        }
        
        // React 更新資料時 會先產生新資料span 再把本來的收起來。某一時間點會同時會有新舊資料再一起
        // 所以要加上<span key={count}>來區別 才知道哪個加上enter, 哪個加上leave
        return (
                <li key={key}>
                    <span>
                        <CSSTransitionGroup
                            component="span"
                            className="count"
                            transitionName="count"
                            transitionEnterTimeout={250}
                            transitionLeaveTimeout={250}
                        >
                            <span key={count}>{count}</span> 
                        </CSSTransitionGroup>
                        lbs {fish.name}{removeButton}
                        </span>
                    <span className="price">{formatPrice(count*fish.price)}</span>
                    
                </li>
            )
        
    }
    
    render(){
        const fishes = this.props.fishes;
        const order = this.props.order;
        const orderIds = Object.keys(order);
          
        const total = orderIds.reduce((prevTotal, key)=>{
            const fish = fishes[key];
            const count = order[key];
            const isAvailable = fish && fish.status === 'available';

            if(isAvailable){
                return prevTotal + count*fish.price || 0;
            }else{
                return prevTotal;
            }
        },0);
        
        return (  
          <div className="order-wrap">
            <h2>Your Order</h2>
            <CSSTransitionGroup 
                className="order"
                component="ul"
                transitionName="order"
                transitionEnterTimeout={500}
                transitionLeaveTimeout={500}
                >
                {/* render function */}
                {orderIds.map(this.renderOrder)}
                <li className="total">
                    <strong>Total:{formatPrice(total)}</strong>
                    
                </li>
            </CSSTransitionGroup>
          </div>
        )
    }
}

Order.propTypes = {
    fishes: React.PropTypes.object.isRequired,
    order: React.PropTypes.object.isRequired,
    removeOrder: React.PropTypes.func.isRequired,
};

export default Order;