// import { combineReducers } from 'redux';

function newMachineReducer(state = {
  clickedAssemblyId: null,
  machine: {
    completedMachine: false,
    assemblies: []
  },
  model: {
    allAssemblies: [],
    remainingAssemblies: [],
    remainingPickOneGroupIds: []
  }
}, action) {
  switch (action.type) {
    case 'ADD_MODEL':
      return Object.assign({}, {...state}, {modelId: action.modelId})
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
          }
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
    default:
      return {...state}
  }
}

export default newMachineReducer;
