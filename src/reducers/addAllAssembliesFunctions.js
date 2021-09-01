
export function addAllAssembliesNew(state, machine, assemblies) {
  // This only gets called once to add all machine assemblies from fetch to the store
  const requiredAssemblies = assemblies.filter( assembly => assembly.required_assembly)
  const unrequiredAssemblies = assemblies.filter( assembly => !assembly.required_assembly)

  // getting all pickOneGroups and adding it to store
  const allPickOneGroups = assemblies.filter( assembly => assembly.pick_one_group )
  const pickOneGroupIds = allPickOneGroups.map( assembly => assembly.pick_one_group.pick_one_group_id )
  const uniquePickOneGroupIds = [...new Set(pickOneGroupIds)]

  return {
    ...state,
      machine: {
        assemblies: requiredAssemblies
      },
      model: {
        ...state.model,
          allAssemblies: assemblies,
          remainingAssemblies: unrequiredAssemblies,
          remainingPickOneGroupIds: uniquePickOneGroupIds
      },
      requesting: false
  }
}

export function addAllAssembliesEdit(state, machine, assemblies) {
  const machineAssemblies = machine.assemblies
  const remainingAssemblies = assemblies.filter( assembly => !machineAssemblies.includes( machineAssemblies.find( ma => ma.id === assembly.id)))

  // getting all pickOneGroups and adding it to store
  const allPickOneGroups = machineAssemblies.filter( assembly => assembly.pick_one_group )
  const pickOneGroupIds = allPickOneGroups.map( assembly => assembly.pick_one_group.pick_one_group_id )
  const uniquePickOneGroupIds = [...new Set(pickOneGroupIds)]

  return {
    ...state,
      machine: {
        assemblies: machineAssemblies
      },
      model: {
        ...state.model,
          allAssemblies: action.assemblies,
          remainingAssemblies: remainingAssemblies,
          remainingPickOneGroupIds: uniquePickOneGroupIds
      },
      requesting: false
  }
}