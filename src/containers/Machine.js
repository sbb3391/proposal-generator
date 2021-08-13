import React, { Component } from 'react';
import { connect } from 'react-redux';
// import { useHistory } from 'react-router-dom'

class Machine extends Component {

  componentDidMount() {
    fetch(`http://localhost:3000/machines/${this.props.match.params.id}`)
    .then(resp => resp.json())
    .then( json => {
      debugger;
    })
  }

  renderTableRows = () => {
    let itemsArray = []

    const part_types = ["engine", "delivery/install", "paper handling", "finishing", "print controller", "power supply"]
    this.props.machine.assemblies.map( assembly => 
      assembly.items.forEach( item => itemsArray.push(item))
    )

    return part_types.map( part => {
      return itemsArray.filter( item => item.part_type === part).map( item => {
        return(
          <tr>
            <td>1</td>
            <td>{item.description}</td>
            <td>{item.branchFloor}</td>
            <td>
              <input type="number" value={item.branchFloor} />
            </td>
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
      <div className="w-1/2 mx-auto">
        <table>
          <thead>
            <td>Quantity</td>
            <td>Item</td>
            <td>Branch Floor Price</td>
            <td>Selling Price</td>
          </thead>
          <tbody>
            {this.renderTableRows()}
          </tbody>
        </table>
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
    machine: machine => dispatch({type: 'ADD_MACHINE', machine: machine})
  }
)



export default connect(mapStateToProps, mapDispatchToProps)(Machine);