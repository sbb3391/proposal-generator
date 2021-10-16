export function fetchProposal(proposalId) {
  return (dispatch) => {
    dispatch({type: "START_FETCHING_ASSEMBLIES"});
    fetch(`https://proposals-api.herokuapp.com/proposals/${proposalId}`)
    .then(resp => resp.json())
    .then(proposal => {
      dispatch({type: 'ADD_PROPOSAL', proposal: proposal})
    })
  }
}