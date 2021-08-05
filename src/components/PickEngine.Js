import React, { Component } from 'react';
import { connect } from 'react-redux';

class PickEngine extends Component {

  componentDidMount() {
    fetch(`http://localhost:3000/models/${this.props.modelId}/assemblies`)
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

const mapStateToProps = state => {
  modelId: state.modelId
}

const mapDispatchToProps = dispatch => {

}

export default connect(mapStateToProps, matchDispatchToProps)(PickEngine)
