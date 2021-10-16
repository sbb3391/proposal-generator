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
    const options = e.target.querySelectorAll("option")
    const selectedOption = Array.from(options).find( option => option.value === e.target.value)

    this.props.addModelToStore(selectedOption.id)
    callback("pickEngine")
  }

  componentDidMount() {
    fetch('https://proposals-api.herokuapp.com/models')
    .then( resp => resp.json())
    .then( json => {
      debugger;
      this.setState({
        models: json.map( model => {
          return{name: model.name, id: model.id}
        })
      })
      this.props.resetMachine()
    })
  }

  render() {
    return (
      <div className="w-1/2 mx-auto h-1/2 place-self-center">
        <div className="flex flex-col">
          <h1 className="text-center text-3xl mt-4">Select Model:</h1>
          <form>
            <div className="flex mt-4">
              <select className="w-1/2 h-12 mx-auto border border-black rounded-md px-2" value={this.state.selectValue} onChange={(e) => this.handleSelection(this.props.updateStep, e)} readOnly>
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
    addModelToStore: id => dispatch({type: 'ADD_MODEL', modelId: id}),
    resetMachine: () => dispatch({type: 'RESET_MACHINE'})
  }
}

export default connect(null, mapDispatchToProps)(PickModel)