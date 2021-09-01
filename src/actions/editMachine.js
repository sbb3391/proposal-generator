import { fetchAssemblies} from './fetchAssemblies'

export function editMachine(machine) {

  return (dispatch) => {
    dispatch({type: 'ADD_MODEL', modelId: machine.modelId})
    dispatch({type: "START_FETCHING_ASSEMBLIES"});
    fetch(`http://localhost:3000/models/${machine.modelId}/assemblies`)
    .then(resp => resp.json())
    .then(assemblies => {
      setTimeout(() => dispatch({type: 'ADD_ALL_ASSEMBLIES', assemblies: assemblies, machine: machine, type: "edit"}),
      1000)
    })
  }
}
