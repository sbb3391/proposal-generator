// import { combineReducers } from 'redux';

function newMachineReducer(state = {
  clickedAssemblyId: null,
  machine: {
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
      return {
        ...state,
          model: {
            ...state.model,
              allAssemblies: action.assemblies,
              remainingAssemblies: action.assemblies
          }
      }
    case 'ADD_ASSEMBLY':
      console.log(action.assembly.name)
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
