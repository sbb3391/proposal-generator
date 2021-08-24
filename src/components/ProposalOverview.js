import React, { Component } from 'react';

class ProposalOverview extends Component {
  render() {
    return (
      <>
      <div>
        <h1>Total Cost:</h1>
      </div>
      <div>
        <button className="border-black border-2 rounded-md p-2">Open PDF</button>
      </div>
      <div>
        <button className="border-black border-2 rounded-md p-2">Edit Pricing Options</button>
      </div>
      </>
    );
  }
}

export default ProposalOverview;