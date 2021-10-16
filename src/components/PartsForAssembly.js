import React, { Component } from 'react';
import { connect } from 'react-redux';

class PartsForAssembly extends Component {

  state = {
    assemblyName: '',
    itemsAssemblies: []
  }

  componentDidMount() {
    fetch(`https://proposals-api.herokuapp.com/assemblies/${this.props.assemblyId}/items_assemblies`)
    .then(resp => resp.json())
    .then(json => {
      this.setState({
        itemsAssemblies: json,
        assemblyName: json[0].assemblyName
      })
    })
  }

  addItemToMachine = (event) => {
    const assemblyId = event.target.dataset.assemblyId
    const itemId = event.target.dataset.itemId
    const findInItemsAssemblies = this.state.itemsAssemblies.find( itemAssembly => itemAssembly.item.id == itemId )
    const indexInItemsAssemblies = this.state.itemsAssemblies.indexOf(findInItemsAssemblies)
    
    this.setState({
      itemsAssemblies: [...this.state.itemsAssemblies.slice(0, indexInItemsAssemblies), ...this.state.itemsAssemblies.slice(indexInItemsAssemblies + 1)]
    })
    
    this.props.addItem(assemblyId, itemId)
  }

  renderItemDetails = (itemAssembly) => {
    return itemAssembly.required ? 
    // <input className="h-8 pl-8" type="checkbox" checked disabled /> 
    null :
    <div className="flex space-x-5">
      <label className="text-xl cursor-pointer hover:text-green-500 hover:underline" data-assembly-id={itemAssembly.assembly_id} data-item-id={itemAssembly.item.id} onClick={this.addItemToMachine}>{itemAssembly.item.description}</label>
      <label className="text-sm">({itemAssembly.item.itemNumber})</label>
    </div>
  }

  renderItems = () => {

    return this.state.itemsAssemblies.map( itemAssembly => {
      return(
        <div className="flex space-x-5">
          {this.renderItemDetails(itemAssembly)}
        </div>
      )
    })
  }

  removeWindow = () => {
    this.props.removeWindow()
  }

  render() {
    return (
      <div className="relative z-20 w-2/3 ml-6 bg-white h-full flex place-items-center overflow-auto">
        <div className="w-2/3 h-5/6 mx-auto flex flex-col">
          <h1 className="w-2/3 mx-auto text-center">Select Options For {this.state.assemblyName}:</h1>
          <div>
            {this.renderItems()}
          </div>
        </div>
        <span className="absolute right-1 top-2 text-3xl cursor-pointer" onClick={this.removeWindow}>&#10006;</span>
      </div>
    );
  }
}

const mapStateToProps = state => (
  {
    allAssemblies: state.model.allAssemblies
  }
)

const mapDispatchToProps = dispatch => (
  {
    addItem: (assemblyId, itemId) => dispatch({type: "ADD_ITEM_TO_MACHINE", assemblyId: assemblyId, itemID: itemId})
  }
)

export default connect(mapStateToProps, mapDispatchToProps)(PartsForAssembly);