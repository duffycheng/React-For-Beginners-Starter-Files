import React, { Component } from 'react';

class AddFishForm extends Component {
    creatFish(e){
        e.preventDefault();
        const fish = {
            name: this.name.value,
            price: this.price.value,
            status: this.status.value,
            desc: this.desc.value,
            image: this.image.value
        }
        this.props.addFish(fish);
        // 清空表單
        this.fishFrom.reset();
    }

    render() {
        return (
            <form ref={input=>this.fishFrom=input} className="fish-edit" onSubmit={(e)=>this.creatFish(e)}>
                <input ref={(input=> this.name=input)} type="text" placeholder="Fish Name" />
                <input ref={(input=> this.price=input)} type="text" placeholder="Fish Price" />
                <select ref={(input=> this.status=input)}>
                    <option value="available">Fresh!</option>
                    <option value="unavailable">Sold Out!</option>
                </select>
                <textarea ref={(input=> this.desc=input)} placeholder="Fish Desc"></textarea>
                <input ref={(input=> this.image=input)} type="text" placeholder="Fish Image" />
                <button type="submit">+ Add Item</button>
            </form>
        );
    }
}

AddFishForm.propTypes = {
    addFish: React.PropTypes.func.isRequired
}

export default AddFishForm;