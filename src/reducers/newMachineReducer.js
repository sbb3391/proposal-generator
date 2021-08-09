// import { combineReducers } from 'redux';

function newMachineReducer(state = {
  clickedAssemblyId: null,
  machine: {
    completedMachine: false,
    assemblies: []
  },
  model: {
    allAssemblies: [],
    remainingAssemblies: []
  }
}, action) {
  switch (action.type) {
    case 'ADD_MODEL':
      return Object.assign({}, {...state}, {modelId: action.modelId})
    case 'ADD_ALL_ASSEMBLIES':
      // This only gets called once to add all machine assemblies from fetch to the store
      const requiredAssemblies = action.assemblies.filter( assembly => assembly.required_assembly)
      const unrequiredAssemblies = action.assemblies.filter( assembly => !assembly.required_assembly)
      return {
        ...state,
          machine: {
            assemblies: requiredAssemblies
          },
          model: {
            ...state.model,
              allAssemblies: action.assemblies,
              remainingAssemblies: unrequiredAssemblies
          }
      }
    case 'ADD_ASSEMBLY':
      // this takes one assembly and adds it to the machine assembly (the one we're building)
      // and removes it from the list of remaining assemblies that are available for selection
      const indexOfAddedAssembly = state.model.remainingAssemblies.indexOf(action.assembly)
      return {
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
    case 'REMOVE_CLICKED_ID':
      return {
        ...state,
          clickedAssemblyId: null
      }
    default:
      return {...state}
  }
}

export default newMachineReducer;
