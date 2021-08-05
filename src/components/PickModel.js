import React, { Component } from 'react';
import uuid from 'react-uuid'
import { connect } from 'react-redux';

class PickModel extends Component {

  state = {
    selectValue: 'none',
    models: []
  }

  renderModelOptions = models => {
    return models.map( model => {
      return <option key={uuid()} id={model.id} >{model.name}</option>
    })
  }

  handleSelection = (callback, e) => {
    const options = Array.from(e.target.querySelector("option"))
    const selectedOption = options.find( option => option.id === e.target.value)

    callback("pickEngine")
    this.props.addModelToStore(selectedOption.id)
  }

  componentDidMount() {
    fetch('http://localhost:3000/models')
    .then( resp => resp.json())
    .then( json => {
      this.setState({
        models: json.map( model => {
          return{name: model.name, id: model.id}
        })
      })
    })
  }

  render() {
    return (
      <div className="w-1/2 mx-auto h-1/2 place-self-center">
        <div className="flex flex-col">
          <h1 className="text-center text-3xl mt-4">Select Model:</h1>
          <form>
            <div className="flex mt-4">
              <select className="w-1/2 h-12 mx-auto" value={this.state.selectValue} onChange={(e) => this.handleSelection(this.props.updateStep, e)} readOnly>
                <option value="none" disabled hidden>
                  Select Model
                </option>
                {this.renderModelOptions(this.state.models)}
              </select>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return{
    addModelToStore: id => dispatch({type: 'ADD_MODEL', modelId: id})
  }
}

export default connect(null, mapDispatchToProps)(PickModel)