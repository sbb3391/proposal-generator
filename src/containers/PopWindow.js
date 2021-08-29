import React, { Component } from 'react';
import { connect } from 'react-redux';
import { allPdf } from '../pdf/allPdf';
import PopPdfPick from '../components/PopPdfPick'

class PopWindow extends Component {

  state = { 
    allPdfs: allPdf,
    remainingPdfs: allPdf,
    proposalPdfs: []
  }

  closePopWindow = (event) => {
    if (event.target.id === "pop-window" ) {
      this.props.togglePopWindow()
    }
  }

  updateProposalPdfsState = newProposalPdfs => {
    this.setState({
      proposalPdfs: newProposalPdfs
    })
  }

  removeFromRemainingPdfsState = (remainingPdfs, findPdf) => {
    this.setState({
      remainingPdfs: remainingPdfs,
      proposalPdfs: [...this.state.proposalPdfs, findPdf]
    })
  }

  render() {
    return (
      
      <div onClick={this.closePopWindow} id="pop-window" className="flex w-full h-full relative z-20">
          <div className="w-2/3 h-3/4 mx-auto border-black border-2 place-self-center bg-white py-4">
            <div className="flex flex-col w-11/12 h-5/6 mx-auto">
              <div className="w-full border-grey-200 border-2 rounded-md">
                Nav
              </div>
              <PopPdfPick togglePopWindow={this.props.togglePopWindow} 
              state={this.state} updateProposalPdfsState={this.updateProposalPdfsState}
              removeFromRemainingPdfsState={this.removeFromRemainingPdfsState}/>
            </div>
          </div>
        </div>
    );
  }
}

const mapStateToProps = state => (
  {}
)

const mapDispatchToProps = dispatch => (
  {
    togglePopWindow: () => dispatch({type: 'TOGGLE_POP_WINDOW'})
  }
)

export default connect(mapStateToProps, mapDispatchToProps)(PopWindow);