import React, { Component } from 'react';
import { connect } from 'react-redux';

class EnginePick extends Component {

  state = {
    model: ''
  }

  componentDidMount() {
    console.log("mounted")
    fetch(`http://localhost:3000/models/${this.props.modelId}/model_assemblies`)
    .then(resp => resp.json())
    .then(json => {
      debugger;
    })
  
  }

  render() {
    return (
      <div>
        Pick Engine
      </div>
    );
  }
}

const mapStateToProps = state => (
  {modelId: state.modelId}
)

const mapDispatchToProps = dispatch => (
  {}
)



export default connect(mapStateToProps, mapDispatchToProps)(EnginePick)
