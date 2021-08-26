import React, { Component } from 'react';

class PopWindow extends Component {

  removePopWindow = () => {
    const popWindow = document.querySelector("#popWindow")
    const App = document.querySelector(".App")
    App.classList.remove("overflow-hidden", "filter", "blur-md")
    popWindow.remove()
  }
  render() {
    console.log("Hello")
    return (
      <div onClick={this.removePopWindow} id="popWindow" className="flex w-full h-full relative z-20">
        <div className="w-2/3 h-3/4 mx-auto border-black border-2 place-self-center bg-white">
          <h1>Hello</h1>
        </div>
      </div>
    );
  }
}

export default PopWindow;