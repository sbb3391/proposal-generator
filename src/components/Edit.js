import React, { Component } from 'react';

class Edit extends Component {

  state = {
    counter: 0,
    word: ""
  }

  addToCounter = () => {
    const wordLength = this.state.word.length
    let prevCounter = this.state.counter

    this.setState({
      counter: prevCounter + wordLength,
      word: ""
    })
  }

  handleStringChange = (event) => {
    const newString = event.target.value

    this.setState({
      word: newString
    })
  }

  render() {
    return (
      <div className="flex flex-col w-1/2 pl-8">
          <h1>{this.state.counter}</h1>
          <input onChange={this.handleStringChange} type="text" value={this.state.word} className="border-2 border-black"/>
          <button onClick={this.addToCounter} className="border-2 border-black">Add to Counter</button>
      </div>
    );
  }
}

export default Edit;