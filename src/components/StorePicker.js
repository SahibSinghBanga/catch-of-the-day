import React, { Component } from 'react';
import {getFunName} from '../helpers';
import PropTypes from 'prop-types';

class StorePicker extends Component {

  static propTypes = {
    history: PropTypes.object
  };

  myInput = React.createRef()

  goToStore = event => {
    // 1. Stop form from submitting
     event.preventDefault()

     // 2. Grab the input value
     const storeName = this.myInput.current.value

     // 3. Change the page to /store/whatever-they-entered
     this.props.history.push(`/store/${storeName}`)
   }
    
  render() {
    return (
        <form className="store-selector" onSubmit={ this.goToStore }>
          <h2>Please Enter A Store</h2>
          <input 
            type="text" 
            ref={this.myInput}
            required 
            placeholder="Store Name" 
            defaultValue={ getFunName() } 
          />
          {/* To Print Arrow: Alt + 2 + 6 */}
          <button type="submit">Visit Store → </button>
        </form>
    );
  }
}

export default StorePicker;