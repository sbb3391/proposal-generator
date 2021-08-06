import React, { Component } from 'react';

class PartsForAssembly extends Component {

  state = {
    assemblyName: '',
    itemsAssemblies: []
  }

  componentDidMount() {
    fetch(`http://localhost:3000/assemblies/${this.props.assemblyId}/items_assemblies`)
    .then(resp => resp.json())
    .then(json => {
      this.setState({
        itemsAssemblies: json,
        assemblyName: json[0].assemblyName
      })
    })
  }

  renderItemDetails = (itemAssembly) => {
   return itemAssembly.required ? 
    // <input className="h-8 pl-8" type="checkbox" checked disabled /> 
    null :
    <div className="flex space-x-5">
      <input className="h-8 pl-8" type="checkbox" />
      <label className="text-xl">{itemAssembly.item.description}</label>
      <label className="text-sm">({itemAssembly.item.itemNumber})</label>
    </div>
  }

  renderLabels = () => {

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
      <div className="relative z-20 w-full h-full bg-red-100 flex place-items-center">
        <div className="w-2/3 h-5/6 mx-auto flex flex-col">
          <h1 className="w-2/3 mx-auto text-center">Select Options For {this.state.assemblyName}:</h1>
          <div>
            <form>
              {this.renderItems()}
              <input type="submit" value="submit" />
            </form>
          </div>
        </div>
        <span className="absolute right-1 top-2 text-3xl cursor-pointer" onClick={this.removeWindow}>&#10006;</span>
      </div>
    );
  }
}

export default PartsForAssembly;