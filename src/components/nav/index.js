import React from 'react'
import { Link } from "react-router-dom";

import './index.css'

class Nav extends React.Component {
  render(){
    return(
      <div className="navigationContainer">
        <div className="navItem"><Link to="/">Home</Link></div>
        <div className="navItem"><Link to="/bag">Bag</Link></div>
        <div className="navItem"><Link to="/products/sport">Sport</Link></div>
      </div>
    )
  }
}

export default Nav
