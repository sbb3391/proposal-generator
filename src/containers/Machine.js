import React, { Component } from 'react';
import { connect } from 'react-redux';
// import { useHistory } from 'react-router-dom'
import MachineOverview from '../components/MachineOverview'
import numeral from 'numeral';

class Machine extends Component {

  componentDidMount() {
    fetch(`http://localhost:3000/machines/${this.props.match.params.id}`)
    .then(resp => resp.json())
    .then( json => {

      // sets the default unit price amount to the branch floor price

      json.assemblies.forEach( assembly => assembly.items.forEach( i => {
        i.unitPrice = i.branchFloor
      }))

      const x = json

      this.props.addMachine(x)
    })
  }

  returnCurrencyFormat = (number) => {
    let newNum = numeral(number).format('$0,0.00')
    return newNum
  }

  returnPercentFormat = (number) => {
    return numeral(number).format('0.0%')
  }

  handlePriceChange = (event) => {
    const modelId = event.target.dataset.modelId
    const itemId = event.target.id
    const assemblyId = event.target.dataset.assemblyId

    const assembly = this.props.machine.assemblies.find( assembly => assembly.id == assemblyId && assembly.modelId == modelId)

    const  changingItem = assembly.items.find( i => i.itemId == itemId)
    changingItem.unitPrice = event.target.value
    
    this.props.changeItemPrice(changingItem)
  }

  renderTableRows = () => {
    let itemsArray = []

    const part_types = ["engine", "delivery/install", "paper handling", "finishing", "print controller", "power supply"]
    this.props.machine.assemblies.map( assembly => 
      assembly.items.forEach( item => itemsArray.push(item))
    )
    
    return part_types.map( part => {
      return itemsArray.filter( item => item.part_type === part).map( item => {

        const sellingPriceValue = () => {
          const assembly = this.props.machine.assemblies.find( assembly => assembly.id == item.assemblyId && assembly.modelId == item.modelId )

          return assembly.items.find( i => i.itemId == item.itemId).unitPrice
        }

        let percent = parseFloat(item.unitPrice) / parseFloat(item.branchFloor)
        return(
          <tr>
            <td className="text-center w-20">1</td>
            <td className="w-96">{item.description}</td>
            <td id="branch-floor-price" className="text-center w-36">{this.returnCurrencyFormat(item.branchFloor)}</td>
            <td className="text-center w-36">
              <input className="w-28" data-assembly-id={item.assemblyId} data-model-id={item.modelId} id={item.itemId} type="number" value={sellingPriceValue()} onChange={this.handlePriceChange} />
            </td> 
            <td className="text-center w-28">{this.returnPercentFormat(percent)}</td>
          </tr>
        )
      })
    })
  }

  render() {
    return (
      <div className="w-full h-full flex justify-around">
        <div className="w-3/5 h- mx-auto py-10 my-3 border-2 border-grey-200 rounded-lg text-center">
          <table className="mx-auto h-full w-full text-center">
            <thead className="w-full block text-center border-b-2 border-black mb-2">
              <tr>
                <td className="text-center w-20">Quantity</td>
                <td className="text-center w-96">Item</td>
                <td className="text-center w-36">Branch Floor</td>
                <td className="text-center w-28">Selling Price</td>
                <td className="text-center w-28">% of BF</td>
              </tr>
            </thead>
            <tbody className="h-full overflow-auto block text-center">
              {this.renderTableRows()}
            </tbody>
          </table>
        </div>
        <div className="w-1/3 h-full flex flex-col space-y-3">
          <MachineOverview machineAssemblies={this.props.machine.assemblies} />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => (
  {
    machine: state.machine
  }
)

const mapDispatchToProps = dispatch => (
  {
    addMachine: machine => dispatch({type: 'ADD_MACHINE', machine: machine}),
    changeItemPrice: item => dispatch({type: 'CHANGE_ITEM_PRICE', item: item})
  }
)



export default connect(mapStateToProps, mapDispatchToProps)(Machine);