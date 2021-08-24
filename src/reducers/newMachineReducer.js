// import { combineReducers } from 'redux';
import update from 'react-addons-update';


const defaultState = {
  requesting: false,
  clickedAssemblyId: null,
  machine: {
    completedMachine: false,
    assemblies: []
  },
  model: {
    allAssemblies: [],
    remainingAssemblies: [],
    remainingPickOneGroupIds: []
  },
  proposal: {}
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
      return {
        ...state,
        machine: {
          assemblies: action.machine.assemblies
        }
      }
    case 'CHANGE_MACHINE_ITEM_PRICE':
      // change_machine_item_price and change_proposal_machine_item_price need refactoring to make it reusable. code works but is not dry
      if (action.item.unitPrice === "") {
        action.item.unitPrice = 0
      }

      const assembly1 = state.machine.assemblies.find( assembly => assembly.id == action.item.assemblyId && assembly.modelId == action.item.modelId)
      const assemblyIndex1 = state.machine.assemblies.indexOf(assembly1)
      const item1 = assembly1.items.find( i => i.itemId == action.item.itemId)
      const itemIndex1 = assembly1.items.indexOf(item1)

      const newAssembly1 = Object.assign({}, assembly1)
      newAssembly1.items[itemIndex1].unitPrice = parseFloat(action.item.unitPrice)
      
      const assemblyState1 = state.machine.assemblies
      const firstHalf1 = assemblyState1.slice(0, assemblyIndex1)
      const secondHalf1 = assemblyState1.slice(assemblyIndex1 + 1)

      return {
        ...state,
        machine: {
          ...state.machine,
          assemblies: [
            ...firstHalf1, newAssembly1, ...secondHalf1
          ]
        }
      }
    case 'CHANGE_PROPOSAL_MACHINE_ITEM_PRICE':
       // change_machine_item_price and change_proposal_machine_item_price need refactoring to make it reusable. code works but is not dry
      if (action.item.unitPrice === "") {
        action.item.unitPrice = 0
      }

      const updatedMachine = state.proposal.machines.find( machine => machine.machineId === action.item.machineId)
      const assembly = updatedMachine.assemblies.find( assembly => assembly.id == action.item.assemblyId && assembly.modelId == action.item.modelId )
      const assemblyIndex = updatedMachine.assemblies.indexOf(assembly)
      const item = assembly.items.find( i => i.itemId == action.item.itemId )
      const itemIndex = assembly.items.indexOf(item)
      
      const newAssembly = Object.assign({}, assembly)
      newAssembly.items[itemIndex].unitPrice = parseFloat(action.item.unitPrice)

      const assemblyState = updatedMachine.assemblies
      const firstHalf = assemblyState.slice(0, assemblyIndex)
      const secondHalf = assemblyState.slice(assemblyIndex + 1)

      // needs to be a cleaner way to do this.
      return {
        ...state,
        proposal: {
          ...state.proposal,
          machines: state.proposal.machines.map( (machine) => {
            return machine === updatedMachine ? {...machine, assemblies: [...firstHalf, newAssembly, ...secondHalf ]} : machine 
          })
        }
      }
    case 'ADD_PROPOSAL':
      // sets default Unit Price to branch floor price. This should be set up in the backend.
      action.proposal.machines.forEach( machine => {
        machine.assemblies.forEach( assembly => {
          assembly.items.forEach( item => {
            item.unitPrice = item.branchFloor
          })
        })
      })

      return {
        ...state,
        proposal: action.proposal,
        requesting: false
      }

    default:
      return {...state}
  }


}

export default newMachineReducer;
