export function createProposal(customerId, proposalName, history) {
  const body = {
    proposal_name: proposalName
  }

  return (dispatch) => {
    fetch(`http://localhost:3000/customers/${customerId}/proposals`, {
      headers: {
        "Content-type": "application/json",
        'Content-Type': 'application/json'
      },
      method: "POST",
      body: JSON.stringify(body)
    })
    .then(resp => resp.json())
    .then(proposal => {
      history.push(`/proposals/${proposal.id}/machine/new`)
      dispatch({type: "ADD_PROPOSAL", proposal: proposal})
    })
  }
}