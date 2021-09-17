import React, { Component } from 'react';
import AddFishForm from './AddFishForm';
import EditFishForm from './EditFishForm';
import PropTypes from 'prop-types';
import Login from './Login';
import firebase from 'firebase';
import base, { firebaseApp } from '../base';

class Inventory extends Component {
  static propTypes = {
    fishes: PropTypes.object,
    updateFish: PropTypes.func,
    deleteFish: PropTypes.func,
    addFish: PropTypes.func,
    loadSampleFishes: PropTypes.func,
  };

  state = {
    uid: null,
    owner: null
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged( user => {
      if(user) {
        this.authHandler({ user });
      }
    })
  }

  authHandler = async (authData) => {
    // 1. Look up the current store in the firebase database
    const storeId = this.props.storeId;
    const store = await base.fetch(storeId, { context: this });
    console.log(store);
    // 2. Claim it if there is no owner
    if(!store.owner) {
      await base.post(`${storeId}/owner`, {
        data: authData.user.uid
      });
    }
    // 3. Set the state of inventory component to reflect the current user
    this.setState({
      uid: authData.user.uid,
      owner: store.owner || authData.user.uid
    });
  }

  authenticate = (provider) => {
    const authProvider = new firebase.auth[`${provider}AuthProvider`]();
    firebase
      .auth()
      .signInWithPopup(authProvider)
      .then(this.authHandler);
  }

  logout = async () => {
    console.log("logging out")
    await firebase.auth().signOut();
    this.setState({ uid: null });
  }
  render() {
    const logout = <button onClick={this.logout}>Log Out!</button>
    // 1. Check if they are logged in
    if(!this.state.uid) {
      return <Login authenticate={this.authenticate} />;
    }

    // 2. Check if they are not the owner of the store
    if(this.state.uid !== this.state.owner) {
      return <div>
        <p>Sorry you are not the owner!</p>
        {logout}
      </div>
    }

    // 3. They must be the owner, Just render out the inventory
    return (
      <div className="inventory">
        <h2>Inventory</h2>
        {logout}
        {Object.keys(this.props.fishes).map( key => 
          <EditFishForm 
            key={key} 
            index={key} 
            fish={this.props.fishes[key]} 
            updateFish={this.props.updateFish} 
            deleteFish={this.props.deleteFish}
          />
        )}
        <AddFishForm addFish={this.props.addFish} />
        <button onClick={this.props.loadSampleFishes}>Load Sample Fishes</button>
      </div>
    );
  }
}

export default Inventory;