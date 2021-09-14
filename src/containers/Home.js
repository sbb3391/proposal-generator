import React, { Component } from 'react';

class Home extends Component {
  render() {
    return (
      <div className="flex w-full h-full place-content-center place-items-center">
        <div className="">
          <iframe width="800" height="475" src="https://www.youtube.com/embed/pt86IhW8gwg" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        </div>
      </div>
    );
  }
}

export default Home;