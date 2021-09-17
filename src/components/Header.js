import React, { Component } from 'react';
import PropTypes from 'prop-types';

const Header = ({ tagline }) => (
  <header className="top">
        <h1>
          Catch 
          <span className="ofThe">
            <span className="of">OF</span>
            <span className="the">THE</span> 
          </span>
          Day
        </h1>
        <h3 className="tagline">
          <span>{tagline}</span>
        </h3>
      </header>
);

Header.propType = {
  tagline: PropTypes.string.isRequired
}
export default Header;