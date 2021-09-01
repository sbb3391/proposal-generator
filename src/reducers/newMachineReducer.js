// import { combineReducers } from 'redux';
import update from 'react-addons-update';
import numeral from 'numeral';
import { changePreviewMachineItemPrice, changeMachineItemPrice, changeProposalItemPrice, updateProposalSellingPrice } from './changePriceFunctions'


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
  popWindow: false
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
      // This only gets called once to add all machine assemblies from fetch to the store
      const requiredAssemblies = action.assemblies.filter( assembly => assembly.required_assembly)
      const unrequiredAssemblies = action.assemblies.filter( assembly => !assembly.required_assembly)

      // getting all pickOneGroups and adding it to store
      const allPickOneGroups = action.assemblies.filter( assembly => assembly.pick_one_group )
      const pickOneGroupIds = allPickOneGroups.map( assembly => assembly.pick_one_group.pick_one_group_id )
      const uniquePickOneGroupIds = [...new Set(pickOneGroupIds)]

      return {
        ...state,
          machine: {
            assemblies: requiredAssemblies
          },
          model: {
            ...state.model,
              allAssemblies: action.assemblies,
              remainingAssemblies: unrequiredAssemblies,
              remainingPickOneGroupIds: uniquePickOneGroupIds
          },
          requesting: false
      }
    case 'ADD_ASSEMBLY':
      // this takes one assembly and adds it to the machine assembly (the one we're building)
      // and removes it from the list of remaining assemblies that are available for selection

      const indexOfAddedAssembly = state.model.remainingAssemblies.indexOf(action.assembly)

      let newState = {
        ...state,
        clickedAssemblyId: action.assembly.id,
        machine: {
          ...state.machine,
          assemblies: [...state.machine.assemblies, action.assembly]
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
    debugger;
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
    case 'PREVIEW_MACHINE': 
      const newPreviewMachine = Object.assign({}, action.machine)

      return{
        ...state,
        previewMachine: newPreviewMachine
      }
    default:
      return {...state}
  }


}

export default newMachineReducer;
