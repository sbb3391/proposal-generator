import React, { Component } from 'react';
import { connect } from 'react-redux';
import { allPdf } from '../pdf/allPdf';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

class PopWindow extends Component {

  state = { 
    allPdfs: allPdf,
    remainingPdfs: allPdf,
    proposalPdfs: []
  }

  removeFromRemainingPdfs = (event) => {
    const id = event.target.id ? event.target.id : event.target.parentElement.id
    const findPdf = this.state.remainingPdfs.find( pdf => pdf.id == id ) 
    const remainingPdfs = this.state.remainingPdfs.filter( pdf => pdf.id !== parseInt(id) )

    this.setState({
      remainingPdfs: remainingPdfs,
      proposalPdfs: [...this.state.proposalPdfs, findPdf]
    })

  }

  removePdfFromProposal = (event) => {
    const pdfId = parseInt(event.target.id)
    const pdf = this.state.proposalPdfs.find( pdf => pdf.id === pdfId ) 
    const pdfIndex = this.state.proposalPdfs.indexOf(pdf)
    let newProposalPdfs = [...this.state.proposalPdfs]
    newProposalPdfs = [...newProposalPdfs.slice(0, pdfIndex), ...newProposalPdfs.slice(pdfIndex + 1)]

    debugger;
    
    this.setState({
      proposalPdfs: newProposalPdfs
    })
  }

  renderRemainingPdfs = () => {
    return this.state.remainingPdfs.map( pdf => {
      return(
        <div key={pdf.id} id={pdf.id} onClick={this.removeFromRemainingPdfs} className="pdf border-2 border-black rounded-md w-11/12 mx-auto flex space-x-2 py-1 cursor-pointer">
          <span className="pl-3">{pdf.id})</span>
          <span>{pdf.name}</span>
        </div>
      )
    })
  }

  renderProposalPdfs = () => {
    return this.state.proposalPdfs.map( (pdf, index) => {
      return(
        <Draggable key={pdf.id} draggableId={`${pdf.id}`} index={index}>
          {(provided) => (
            <div id={pdf.id}ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps} 
            className="pdf border-2 border-black rounded-md w-11/12 mx-auto flex space-x-2 py-1">
              <span className="cursor-pointer" id={pdf.id} onClick={this.removePdfFromProposal} >&#10060;</span>
              <span>{pdf.name}</span>
            </div>
          )}
        </Draggable>
      )
    })
  }

  onDragEnd = (result) => {
    const {destination, source, reason } = result

    if (!destination || reason === "CANCEL") {
      return;
    }

    if ( destination.droppableId === source.droppableId && destination.index === source.index ) {
      return
    }

    const proposalPdfs = [...this.state.proposalPdfs]
    const droppedPdf = this.state.proposalPdfs[source.index]

    proposalPdfs.splice(source.index, 1)
    proposalPdfs.splice(destination.index, 0, droppedPdf)

    this.setState({
      proposalPdfs
    })
  }

  closePopWindow = (event) => {
    if (event.target.id === "pop-window" ) {
      this.props.togglePopWindow()
    }
  }

  render() {
    return (
      <DragDropContext onDragEnd={this.onDragEnd}>

        <div onClick={this.closePopWindow} id="pop-window" className="flex w-full h-full relative z-20">
          <div className="w-2/3 h-3/4 mx-auto border-black border-2 place-self-center bg-white py-4">
            <div className="flex flex-col w-11/12 h-5/6 mx-auto">
              <div className="w-full border-grey-200 border-2 rounded-md">
                Nav
              </div>
              <div className="flex w-full mx-auto h-full place-content-center">
                <div id="available-pdfs" className="w-1/2 h-full flex flex-col pt-5 space-y-2 border-grey-200 border-2 rounded-md mt-6">
                  <h1 className="text-center">Available PDFs:</h1>
                  <div className="w-full h-full flex flex-col space-y-2 overflow-auto pb-4">
                    {this.renderRemainingPdfs()}
                  </div>
                </div>
                <Droppable droppableId="dp1">
                  {(provided) => (
                    <div ref={provided.innerRef} {...provided.droppableProps} id="proposal-pdfs" className="w-1/2 h-full flex flex-col pt-5 space-y-2 border-grey-200 border-2 rounded-md mt-6">
                      {provided.placeholder}
                      <h1 className="text-center">Proposal PDFs:</h1>
                      <div className="w-full h-full flex flex-col space-y-2 overflow-auto pb-4">
                        {this.renderProposalPdfs()}
                      </div>
                    </div>
                  )}
                </Droppable>
              </div>
            </div>
          </div>
        </div>
      </DragDropContext>
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