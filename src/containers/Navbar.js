import React, { Component } from 'react';
import { NavLink } from "react-router-dom";

class Navbar extends Component {
  
  render() {
    return (
      <div className="flex space-x-10 justify-center py-4">
        <NavLink className="text-xl bg-blue-200 px-3 py-1" activeClassName="text-xl bg-blue-500 px-3 py-1" to='/' exact>Home</NavLink>
        <NavLink className="text-xl bg-blue-200 px-3 py-1" activeClassName="text-xl bg-blue-500 px-3 py-1" to="/about">All Proposals</NavLink>
        <NavLink className="text-xl bg-blue-200 px-3 py-1" activeClassName="text-xl bg-blue-500 px-3 py-1" to="/edit">Edit Proposal</NavLink>
      </div>
    );
  }
  }

export default Navbar;