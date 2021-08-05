import React, { Component } from 'react';

export default class PickModel extends Component {

  componentDidMount() {
    fetch('http://localhost:3000/models')
    .then( resp => resp.json())
    .then(json => {
      debugger;
    })
  }
  render() {
    return (
      <div className="w-1/2 mx-auto h-1/2 place-self-center">
        <div className="flex flex-col">
          <h1 className="text-center text-3xl mt-4">Select Model:</h1>
          <form>
            <div className="flex mt-4">
              <select className="w-1/2 h-12 mx-auto">
                <option>1</option>
                <option>2</option>
                <option>2</option>
                <option>2</option>
              </select>
            </div>
          </form>
        </div>
      </div>
    );
  }
}