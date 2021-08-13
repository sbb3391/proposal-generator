import React, { Component } from 'react';

class NewProposal extends Component {
  render() {
    return (
      <>
        <h1>Create New Proposal</h1>

        <form>
          <div className="flex flex-col">
            <label>Customer Name</label>
            <input type="text" className="border border-black w-1/3"/>
          </div>
          <div className="flex flex-col">
            <label>Proposal Name</label>
            <input type="text" className="border border-black w-1/3"/>
          </div>
          <div className="flex flex-col">
            <label>Pricing Options</label>
            <div>
              <input type="checkbox"/>
              <label>Cash Purchase</label>
            </div>
            <div>
              <input type="checkbox"/>
              <label>60 Month FMV</label>
            </div>
            <div>
              <input type="checkbox"/>
              <label>60 Month $1 Buyout</label>
            </div>
            <div>
              <input type="checkbox"/>
              <label>48 Month FMV</label>
            </div>
            <div>
              <input type="checkbox"/>
              <label>48 Month $1 Buyout</label>
            </div>
          </div>
          
        </form>
      </>
    );
  }
}

export default NewProposal;