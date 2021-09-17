import React, { Component } from 'react';
import Header from './Header';
import Inventory from './Inventory';
import Order from './Order';
import Fish from './Fish';
import sampleFishes from '../sample-fishes'
import base from '../base'
import PropTypes from 'prop-types';

class App extends Component {

  state = {
    fishes: {},
    order: {}
  }

  static propTypes = {
    match: PropTypes.object 
  }

  componentDidMount() {
    const { params } = this.props.match;
    // First re-instantiate our local-storage
    const localStorageRef = localStorage.getItem(params.storeId)
    if( localStorageRef ) {
      this.setState({ order: JSON.parse(localStorageRef) })
    }

    this.ref = base.syncState(`${params.storeId}/fishes`, {
      context: this,
      state: 'fishes'
    })
  }

  componentDidUpdate() {
    localStorage.setItem(
      this.props.match.params.storeId,
      JSON.stringify(this.state.order)
    )
  }

  componentWillUnmount() {
    base.removeBinding(this.ref);
  }

  addFish = (fish) => {
    // 1. Take a copy of state
    const fishes = { ...this.state.fishes }
    // 2. Add our new fish to that variable
    fishes[`fish${Date.now()}`] = fish
    // 3. Set the new fishes to state
    this.setState({ fishes })
  }

  updateFish = (key, updatedFish) => {
    // 1. Take a copy of current state
    const fishes = { ...this.state.fishes }
    // 2. Update the state
    fishes[key] = updatedFish;
    // 3. Set that to state
    this.setState({ fishes });
  }

  deleteFish = (key) => {
    // 1. Take a copy of state
    const fishes = { ...this.state.fishes };
    // 2. Remove the fish
    fishes[key] = null;
    // 3. Update state
    this.setState({ fishes });
  }

  loadSampleFishes = () => {
    this.setState({ fishes: sampleFishes })
  }

  addToOrder = (key) => {
    // 1. Take a copy of state
    const order = { ...this.state.order }
    // 2. Either add to the orders or update the number of our order
    order[key] = order[key] + 1 || 1 
    // 3. Call setState to update our state object
    this.setState({ order })
  }

  removeFromOrder = (key) => {
    // 1. Take a copy of state
    const order = { ...this.state.order };
    // 2. Remove that item from order
    delete order[key];
    // 3. Update the state
    this.setState({ order });
  }

  render() {
    return (
      <div className="catch-of-the-day">
        <div className="menu">
          <Header tagline="Fresh Sea Food Market" />
          <ul className="fishes">
            {
              Object.keys(this.state.fishes).map(key => 
                <Fish 
                key={key} 
                index={key}
                details={this.state.fishes[key]} 
                addToOrder={this.addToOrder}
              />
              )
            }
          </ul>
        </div>
        <Order 
          fishes={this.state.fishes}
          order={this.state.order}
          removeFromOrder={this.removeFromOrder}
        />
        <Inventory 
          addFish={this.addFish} 
          updateFish={this.updateFish} 
          deleteFish={this.deleteFish}
          loadSampleFishes={this.loadSampleFishes} 
          fishes={this.state.fishes}
          storeId={this.props.match.params.storeId}
        />
      </div>
    );
  }
}

export default App;