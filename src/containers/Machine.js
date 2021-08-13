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
      this.props.addMachine(json)
    })
  }

  returnCurrencyFormat = (number) => {
    let newNum = numeral(number).format('$0,0.00')
    return newNum
  }

  returnPercentFormat = (number) => {
    return numeral(number).format('0%')
  }



  renderTableRows = () => {
    let itemsArray = []

    const part_types = ["engine", "delivery/install", "paper handling", "finishing", "print controller", "power supply"]
    this.props.machine.assemblies.map( assembly => 
      assembly.items.forEach( item => itemsArray.push(item))
    )

    return part_types.map( part => {
      return itemsArray.filter( item => item.part_type === part).map( item => {

        let percent = parseFloat(item.branchFloor) / parseFloat(item.branchFloor)

        return(
          <tr >
            <td className="text-center">1</td>
            <td>{item.description}</td>
            <td id="branch-floor-price" className="text-center w-36">{this.returnCurrencyFormat(item.branchFloor)}</td>
            <td id="selling-price" className="text-center w-32">{this.returnCurrencyFormat(item.branchFloor)}</td>
            <td className="text-center w-32">{this.returnPercentFormat(percent)}</td>
            {/* add in functionality to change selling price later */}
            {/* <td>
              <input type="number" defaultValue={this.returnCurrencyFormat(item.branchFloor)} className="text-center" />
            </td> */}
          </tr>
        )
      })
    })


    //     return(
    //       <tr>
    //         <td>1</td>
    //         <td>{item.description}</td>
    //         <td>{item.branchFloor}</td>
    //         <td>
    //           <input type="number" value={item.branchFloor} />
    //         </td>
    //       </tr>
    //     )
    //   })
    // })
  }

  render() {
    return (
      <div className="w-full h-full flex justify-around">
        <div className="w-3/5 h-full overflow-auto mx-auto py-4">
          <table>
            <thead className="">
              <tr className="border-b-2 border-black">
                <td className="text-center">Quantity</td>
                <td className="text-center">Item</td>
                <td className="text-center">Branch Floor Price</td>
                <td className="text-center">Selling Price</td>
                <td className="text-center">Percent of BF</td>
              </tr>
            </thead>
            <tbody className="">
              {this.renderTableRows()}
            </tbody>
          </table>
        </div>
        <div className="w-1/3 h-full flex flex-col">
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
    addMachine: machine => dispatch({type: 'ADD_MACHINE', machine: machine})
  }
)



export default connect(mapStateToProps, mapDispatchToProps)(Machine);