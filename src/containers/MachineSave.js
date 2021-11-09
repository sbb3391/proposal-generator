import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchCustomersForSelectBox } from '../actions/fetches';
import CompleteButton from '../components/CompleteButton'

const MachineSave = (props) => {

  // const [state, setState] = useState({
  //   selectValue: "none",
  //   customers: []
  // })

  const [customers, setCustomers] = useState([])
  const [selectValue, setSelectValue] = useState("none")
  const [fetchUrl, setFetchUrl] = useState("")

  useEffect(() => {
    let addCustomersTostate = (customersArray) => {
      setCustomers(customersArray.map( customer => {return {id: customer.id, name: customer.customer_name}}))
    }

    fetchCustomersForSelectBox(addCustomersTostate)
  })

  const handleSelection = (event) => {
    const selectBoxOptions = event.target.options
    const optionId = selectBoxOptions[event.target.selectedIndex].id

    setSelectValue(event.target.value)
    setFetchUrl(`/customers/${optionId}/proposals`)

  }

  const closeMachineSave = (event) => {
    if (event.target.id === "machine-save" ) {
      props.toggleMachineSave()
    }
  }

  const renderCustomers = (customers) => {
    return customers.map( customer => {
      return <option id={customer.id} value={customer.name}>{customer.name}</option>
    })
  }

  return (
    <div onClick={closeMachineSave} id="machine-save" className="flex w-full h-full relative z-20">
      <div className="w-1/2 h-2/3 mx-auto border-black border-2 place-self-center bg-white py-4">
          <div className="flex flex-col w-full h-full space-y-3">
            <h1 className="w-11/12 mx-auto text-center">Create a Proposal:</h1>
            <div className="flex flex-col space-y-2 w-11/12 mx-auto">
              <label className="text-2xl">Customer Name</label>
              <select className="w-1/2 h-12 mx-auto border border-black rounded-md px-2" value={selectValue} onChange={(event) => handleSelection(event)} readOnly>
                <option value="none" disabled hidden>
                  Select Customer
                </option>
                {renderCustomers(customers)}
              </select>
            </div>
            <div className="flex flex-col space-y-2 w-11/12 mx-auto ">
              <label className="text-2xl">Proposal Name</label>
              <input id="propsal-name" className="h-12 border border-black rounded-md px-2"></input>
            </div>
            <div className="flex content-center items-center">
              {/* <button onClick={createMachine(props, history)} className="font-bold text-2xl rounded-md p-2 mx-auto bg-green-500 text-white bold cursor-pointer">Create Proposal and Add Machine</button> */}
              <CompleteButton value={"Create Proposal"} fetchUrl={fetchUrl} fetchAction="POST" 
                 dispatch={(json) => {return null} }/>
            </div>
          </div>
      </div>
    </div>
  );
}

const mapStateToProps = state => (
  {
    machineAssemblies: state.machine.assemblies,
    fetchAction: "POST",
  }
)

const mapDispatchToProps = dispatch => (
  {
    toggleMachineSave: () => dispatch({type: 'TOGGLE_MACHINE_SAVE'})
  }
)

export default connect(mapStateToProps, mapDispatchToProps)(MachineSave);