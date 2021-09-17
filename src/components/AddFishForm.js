import React, { Component } from 'react';
import PropTypes from 'prop-types';

class AddFishForm extends Component {
  nameRef = React.createRef()
  priceRef = React.createRef()
  statusRef = React.createRef()
  descRef = React.createRef()
  imgRef = React.createRef()

  static propTypes = {
    addFish: PropTypes.func
  }

  createFish = (event) => {

    // 1. Stop form from submitting
    event.preventDefault()

    const fish = {
      name: this.nameRef.current.value,
      price: parseFloat(this.priceRef.current.value),
      status: this.statusRef.current.value,
      desc: this.descRef.current.value,
      img: this.imgRef.current.value,
    }

    // 2. Add fish
    this.props.addFish(fish)

    // 3. Reset the form
    event.currentTarget.reset()
  }

  render() {
    return (
      <form className="fish-edit" onSubmit={this.createFish}>
        <input 
          type="text" 
          name="name" 
          ref={this.nameRef}
          placeholder="Name" 
        />

        <input 
          type="text" 
          name="price" 
          ref={this.priceRef} 
          placeholder="Price" 
        />

        <select name="status" ref={this.statusRef}>
          <option value="available">Fresh!</option>
          <option value="unavailable">Sold Out!</option>
        </select>

        <textarea 
          name="desc" 
          ref={this.descRef} 
          placeholder="Desc"
        ></textarea>

        <input 
          type="text" 
          name="img" 
          ref={this.imgRef} 
          placeholder="Image" 
        />

        <button type="submit">+ Add Fish</button>
      </form>
    );
  }
}

export default AddFishForm;