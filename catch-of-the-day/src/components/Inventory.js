import React from 'react'; 

import AddFishForm from './AddFishForm';
import base from '../base';

class Inventory extends React.Component {
    constructor(){
        super();
        this.renderInventory = this.renderInventory.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.renderLogin = this.renderLogin.bind(this);
        this.authenticate = this.authenticate.bind(this);
        this.authHandler = this.authHandler.bind(this);
        this.logout = this.logout.bind(this);

        this.state = {
            uid:null,
            owner: null
        }
    }

    // login button 會出現 然後到這裡執行後才會消失
    // 可以利用其他hook 讓login 先藏起來 這邊確認了再出現
    componentDidMount(){
        base.onAuth((user)=>{
            if(user){
                this.authHandler(null, {user});
            }
        });
    }


        renderInventory(key) {
            const fish = this.props.fishes[key];
            // key is for being unique, otherwise will have key is not unique error
            return (
                <div className="fish-edit" key={key}>
                        <input type="text" name="name" value={fish.name} placeholder="Fish Name" onChange={(e)=>this.handleChange(e, key)} />
                        <input type="text" name="price" value={fish.price} placeholder="Fish Price" onChange={(e)=>this.handleChange(e, key)} />
                        <select name="status" value={fish.status} onChange={(e)=>this.handleChange(e, key)}>
                            <option value="available">Fresh!</option>
                            <option value="unavailable">Sold Out!</option>
                        </select>
                        <textarea name="desc" placeholder="Fish Desc" value={fish.desc} onChange={(e)=>this.handleChange(e, key)}></textarea>
                        <input type="text" name="image" value={fish.image} placeholder="Fish Image" onChange={(e)=>this.handleChange(e, key)} />
                        <button onClick={()=>this.props.removeFish(key)}>Remove Fish</button>
                </div>
            )
    }

    renderLogin(){
        return(
            <div>
                <h2>Inventory</h2>
                <p>Sign in to manage your store's Inventory</p>
                <button className="github" onClick={()=>this.authenticate('github')}>Login In with GitHub</button>
                <button className="facebook" onClick={()=>this.authenticate('facebook')}>Login In with Facebook</button>
                <button className="twitter" onClick={()=>this.authenticate('twitter')}>Login In with Twitter</button>
            </div>
        )
    }

    authenticate(provider){
        console.log(`Try login with ${provider}`);
        base.authWithOAuthPopup(provider, this.authHandler);
    }

    logout(){
        base.unauth();
        this.setState({
            uid:null
        })
    }

    authHandler(err, authData){
        console.log(authData);
        if(err){
            console.log(err);
            return;
        }
        //grab the store info
        const storeRef = base.database().ref(this.props.storeId);
        //query the firebase once for the store data
        storeRef.once('value', (snapshot)=>{
            const data = snapshot.val() || {};
            //
            if(!data.owner){
                storeRef.set({
                    owner: authData.user.uid
                })
            }

            this.setState({
                uid: authData.user.uid,
                owner: data.owner || authData.user.uid
            })
        });

        

    }

    handleChange(e, key){
        const fish = this.props.fishes[key];
        const updateFish = {
            ...fish,
            [e.target.name]: e.target.value
        };
        this.props.updateFish(key, updateFish);

    }

    render(){
        const logout = <button onClick={this.logout}>Log out</button>;
        //check if login
        if(!this.state.uid){
                return <div>{this.renderLogin()}</div>
        }
        // check if the user is the owner
        if(this.state.uid !== this.state.owner){
            return(
                <div>
                    <p>Sorry you aren't the owner of this store!</p>
                    {logout}
                </div>
            )
        }
        return (
            <div>
                <h2>Iventory</h2>
                {logout}
                {Object.keys(this.props.fishes).map(this.renderInventory)}
                <AddFishForm addFish={this.props.addFish} />
                <button onClick={this.props.loadSamples}>Load Sample Fishes</button>
            </div>
        
        )
    }
}

Inventory.propTypes = {
    fishes: React.PropTypes.object.isRequired,
    storeId: React.PropTypes.string.isRequired,
    addFish: React.PropTypes.func.isRequired,
    removeFish: React.PropTypes.func.isRequired,
    updateFish: React.PropTypes.func.isRequired,
    loadSamples: React.PropTypes.func.isRequired
};

export default Inventory;