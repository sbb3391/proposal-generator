// import { combineReducers } from 'redux';
import update from 'react-addons-update';
import numeral from 'numeral';
import { changePreviewMachineItemPrice, changeMachineItemPrice, changeProposalItemPrice, updateProposalSellingPrice } from './changePriceFunctions'
import { addAllAssembliesEdit, addAllAssembliesNew } from './addAllAssembliesFunctions';


const defaultState = {
  requesting: false,
  clickedAssemblyId: null,
  machine: {
    completedMachine: false,
    assemblies: [],

  },
  model: {
    allAssemblies: [],
    remainingAssemblies: [],
    remainingPickOneGroupIds: []
  },
  proposal: {},
  previewMachine: {},
  customers: [],
  popWindow: false,
  machineSave: false
}

function newMachineReducer(state = defaultState, action) {
  switch (action.type) {
    case 'RESET_MACHINE':
      return defaultState
    case 'ADD_MODEL':
      return Object.assign({}, {...state}, {modelId: action.modelId})
    case 'START_FETCHING_ASSEMBLIES':
      return {
        ...state,
        requesting: true
      }
    case 'ADD_ALL_ASSEMBLIES':
      switch (action.machineStatus) {
        case "new":
          return addAllAssembliesNew(state, action.machine, action.assemblies)
        case "edit":
          return addAllAssembliesEdit(state, action.machine, action.assemblies)
      }
    case 'ADD_ASSEMBLY':
      // this takes one assembly and adds it to the machine assembly (the one we're building)
      // and removes it from the list of remaining assemblies that are available for selection

      const indexOfAddedAssembly = state.model.remainingAssemblies.indexOf(action.assembly)
      const addedAssembly = Object.assign({}, action.assembly)
      const requiredItems = addedAssembly.items.filter( item => item.required )
      addedAssembly.items = requiredItems

      let newState = {
        ...state,
        clickedAssemblyId: addedAssembly.id,
        machine: {
          ...state.machine,
          assemblies: [...state.machine.assemblies, addedAssembly]
        },
        model: {
          ...state.model,
          remainingAssemblies: [...state.model.remainingAssemblies.slice(0, indexOfAddedAssembly), ...state.model.remainingAssemblies.slice(indexOfAddedAssembly + 1)]
        }
      }

      // determines if the selected assembly belongs to a 'pick one group.' if it does, all other items in the group will also be
      // removed as selection options.
      const group = action.assembly.pick_one_group
      
      if (group) {
        const indexOfGroupId = state.model.remainingPickOneGroupIds.indexOf(group.pick_one_group_id)
        const remainingAssembliesInPickOneGroups = state.model.remainingAssemblies.filter( assembly => assembly.pick_one_group)
        const assembliesInGroup = remainingAssembliesInPickOneGroups.filter( assembly => assembly.pick_one_group.pick_one_group_id === group.pick_one_group_id )

        const newRemainingAssemblies = state.model.remainingAssemblies.filter( assembly => !assembliesInGroup.includes(assembly))

        newState = {
          ...newState,
            model: {
              ...newState.model,
              remainingPickOneGroupIds: [...state.model.remainingPickOneGroupIds.slice(0, indexOfGroupId), ...state.model.remainingPickOneGroupIds.slice( indexOfGroupId + 1) ],
              remainingAssemblies: newRemainingAssemblies
            }
        }
      }
      return newState;
    case 'ADD_ITEM_TO_MACHINE': 
      const findThisAssemblyInMachine = state.machine.assemblies.find( assembly => assembly.id == action.assemblyId )
      const findThisAssemblyInAllAssemblies = state.model.allAssemblies.find( assembly => assembly.id == action.assemblyId)
      let assemblyToAdd = Object.assign({}, findThisAssemblyInMachine)

      const itemToAdd = findThisAssemblyInAllAssemblies.items.find( item => item.itemId == action.itemID)
      
      assemblyToAdd = {
        ...assemblyToAdd,
        items: [...assemblyToAdd.items, itemToAdd]
      }

      const anyRemainingItemsToAdd = () => {
        const clickedAssemblyId = state.clickedAssemblyId
        if (assemblyToAdd.items.length === findThisAssemblyInAllAssemblies.items.length) {
          return null;
        } else {
          return clickedAssemblyId
        }
      }

      return{
        ...state,
        clickedAssemblyId: anyRemainingItemsToAdd(),
        machine: {
          ...state.machine,
          assemblies: state.machine.assemblies.map( assembly => {
            return assembly.id == assemblyToAdd.id ? assemblyToAdd : assembly
          })
        }
      }
    case 'REMOVE_ASSEMBLY':
      const findAssembly = state.model.allAssemblies.find( assembly => assembly.id == action.assembly.id ) 
      
      const determinePickOneStatus = () => {
        return action.assembly.pick_one_group ? action.assembly.pick_one_group.pick_one_group_id : null 
      }

      const returnThesePickOnesToRemainingAssemblies = () => {
        if (determinePickOneStatus()) {
          const pickOnes = state.model.allAssemblies.filter( assembly => assembly.pick_one_group )
          const pickOnesToPlace = pickOnes.filter( po => po.pick_one_group.pick_one_group_id == determinePickOneStatus() && po !== findAssembly)
          return pickOnesToPlace
        } else {
          return []
        }
      }

      let newRemainingAssemblies = [...state.model.remainingAssemblies]
      newRemainingAssemblies.push(findAssembly)
      returnThesePickOnesToRemainingAssemblies().forEach( assembly => newRemainingAssemblies.push(assembly))
      
      let newRemainingPickOneGroupIds = [...state.model.remainingPickOneGroupIds]
      if (determinePickOneStatus()) {
        newRemainingPickOneGroupIds.push(determinePickOneStatus())
      }
      
      const machineAssemblyIndex = state.machine.assemblies.indexOf( state.machine.assemblies.find( assembly => assembly.id == action.assembly.id))
      
      return{
        ...state,
        model: {
          ...state.model,
          remainingAssemblies: newRemainingAssemblies,
          remainingPickOneGroupIds: newRemainingPickOneGroupIds
        },
        machine: {
          ...state.machine,
          assemblies: [...state.machine.assemblies.slice(0, machineAssemblyIndex), ...state.machine.assemblies.slice(machineAssemblyIndex + 1)]
        }
      }
    case 'REMOVE_ITEM':
      let eventAssembly = state.machine.assemblies.find( assembly => assembly.id == action.assembly.id)
      const eventItem = eventAssembly.items.find( item => item.itemId == action.itemId)
      const newItems = eventAssembly.items.filter( item => item !== eventItem)
      const newAssembly = Object.assign({}, eventAssembly)
      newAssembly.items = newItems

      return{
        ...state,
        machine: {
          ...state.machine,
          assemblies: state.machine.assemblies.map( assembly => {
            if (assembly.id === newAssembly.id) {
              return newAssembly
            } else {
              return assembly
            }
          })
        }
      }
    case 'ADD_ITEM':
      const eAssembly = state.machine.assemblies.find( assembly => assembly.id == action.assembly.id)
      const modelAssembly = state.model.allAssemblies.find( assembly => assembly.id == action.assembly.id)
      const actionItem = modelAssembly.items.find( i => i.itemId == action.itemId)

      const aNewAssembly = Object.assign({}, eAssembly)
      aNewAssembly.items.push(actionItem)

      return{
        ...state,
        machine: {
          ...state.machine,
          assemblies: state.machine.assemblies.map( assembly => {
            if (assembly.id === aNewAssembly.id) {
              return aNewAssembly
            } else {
              return assembly
            }
          })
        }
      }
    case 'REMOVE_CLICKED_ID':
      return {
        ...state,
          clickedAssemblyId: null
      }

    case 'ADD_MACHINE':
      let sellingPrice = 0
      let items = [];

      action.machine.assemblies.forEach( assembly => assembly.items.forEach( item => {
          items.push(parseFloat(item.unitPrice))
        })
      )

      sellingPrice = numeral(items.reduce((a, b) => parseFloat(a) + parseFloat(b), 0)).format('000.00')

      return {
        ...state,
        machine: {
          assemblies: action.machine.assemblies,
          sellingPrice: sellingPrice
        }
      }
    case 'CHANGE_ITEM_PRICE': 
      switch (action.machineType) {
        case 'proposal':
          return changeProposalItemPrice(action.item, state)
        case 'machine':
          return changeMachineItemPrice(action.item, state)
        case 'preview':
          return changePreviewMachineItemPrice(action.item, state)
      }

    
    case 'ADD_PROPOSAL':
      const newProposal = Object.assign({}, action.proposal)
      newProposal.sellingPrice = updateProposalSellingPrice(action.proposal)

      return {
        ...state,
        proposal: newProposal,
        requesting: false
      }
    case 'TOGGLE_POP_WINDOW': 
      if (state.popWindow) {
        document.querySelector(".App").classList.remove("overflow-hidden", "filter", "blur-md")

        return{
          ...state,
          popWindow: false
        }
      } else {
        console.log(document.querySelector(".App"))
        document.querySelector(".App").classList.add("overflow-hidden", "filter", "blur-md")

        return{
          ...state,
          popWindow: true
        }
      }
    case 'TOGGLE_MACHINE_SAVE': 
      if (state.machineSave) {
        document.querySelector(".App").classList.remove("overflow-hidden", "filter", "blur-md")

        return{
          ...state,
          machineSave: false
        }
      } else {
        document.querySelector(".App").classList.add("overflow-hidden", "filter", "blur-md")

        return{
          ...state,
          machineSave: true
        }
      }
    case 'UPDATE_SERVICE_CONTRACT':
      return{
        ...state,
        proposal: {
          ...state.proposal,
          machines: state.proposal.machines.map( machine => {
            if (machine.machineId == action.machine.machineId) {
              return action.machine
            } else {
              return machine
            }
          })
        }
      }
    case 'START_UPDATING_MACHINE':
      const machineIndex = state.proposal.machines.indexOf(action.machine)
      const newMachine = Object.assign({}, state.proposal.machines[machineIndex])
      newMachine.requesting = true

      return{
        ...state,
        proposal: {
          ...state.proposal,
          machines: [
            ...state.proposal.machines.slice(0, machineIndex), newMachine, ...state.proposal.machines.slice(machineIndex + 1)
          ]
        }
      }
    case 'UPDATE_PROPOSAL_MACHINE': 
    // resuses a lot of code from start Updating Machine
      const findMachine1 = state.proposal.machines.find( machine => machine.machineId === action.machine.machine.machineId)
      const indexMachine = state.proposal.machines.indexOf(findMachine1)
      const newMachine1 = Object.assign({}, action.machine.machine)

      return{
        ...state,
        proposal: {
          ...state.proposal,
          machines: [
            ...state.proposal.machines.slice(0, indexMachine), newMachine1, ...state.proposal.machines.slice(indexMachine + 1)
          ]
        }
      }
    case "TESTING":
      return{
        ...state,
        testing: "testing"
      }
    case 'PREVIEW_MACHINE': 
      const newPreviewMachine = Object.assign({}, action.machine)

      return{
        ...state,
        previewMachine: newPreviewMachine
      }
    case 'ADD_CUSTOMERS':
      return{
        ...state,
        customers: action.customers
      }
    case 'FLIP_CUSTOMER_CARD':
      return{
        ...state,
        customers: state.customers.map( customer => {
          if (customer.id == action.customerId) {
            const customerSide = () => {return customer.side == "front" ? "back" : "front"}
            
            customer.side = customerSide()
            return customer
          } if (customer.side === "back") {
            customer.side = "front"
            return customer
          } else {
            return customer
          }
        })
      }
    case 'NEW_PROPOSAL':
      return{
        ...state,
        customers: []
      }
    case 'REMOVE_MACHINE':
      if (state.proposal.machines) {
        const stateCopy = Object.assign({}, {...state})
        const machine = stateCopy.proposal.machines.find( machine => machine.machineId === action.machineId)
        const indexOfMachine = stateCopy.proposal.machines.indexOf(machine)
        debugger;

        return {
          ...state,
          proposal: {
            ...state.proposal,
            sellingPrice: state.proposal.sellingPrice - machine.sellingPrice,
            machines: [...state.proposal.machines.slice(0, indexOfMachine), ...state.proposal.machines.slice(indexOfMachine + 1)]
          }
        }
      }
    default:
      return {
        ...state
      }
  }


}

export default newMachineReducer;
