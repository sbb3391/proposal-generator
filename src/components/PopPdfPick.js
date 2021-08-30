import React, { Component } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

class PopPdfPick extends Component {

  removeFromRemainingPdfs = (event) => {
    const id = event.target.id ? event.target.id : event.target.parentElement.id
    const findPdf = this.props.state.remainingPdfs.find( pdf => pdf.id == id ) 
    const remainingPdfs = this.props.state.remainingPdfs.filter( pdf => pdf.id !== parseInt(id) )

    this.props.removeFromRemainingPdfsState(remainingPdfs, findPdf)

  }

  removePdfFromProposal = (event) => {
    const pdfId = parseInt(event.target.id)
    const pdf = this.props.state.proposalPdfs.find( pdf => pdf.id === pdfId ) 
    const pdfIndex = this.props.state.proposalPdfs.indexOf(pdf)
    let newProposalPdfs = [...this.props.state.proposalPdfs]
    newProposalPdfs = [...newProposalPdfs.slice(0, pdfIndex), ...newProposalPdfs.slice(pdfIndex + 1)]
    
    this.props.updateProposalPdfs(newProposalPdfs)
  }

  renderRemainingPdfs = () => {
    return this.props.state.remainingPdfs.map( pdf => {
      return(
        <div key={pdf.id} id={pdf.id} onClick={this.removeFromRemainingPdfs} className="pdf border-2 border-black rounded-md w-11/12 mx-auto flex space-x-2 py-1 cursor-pointer">
          <span className="pl-3">{pdf.id})</span>
          <span>{pdf.name}</span>
        </div>
      )
    })
  }

  renderProposalPdfs = () => {
    return this.props.state.proposalPdfs.map( (pdf, index) => {
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

    const proposalPdfs = [...this.props.state.proposalPdfs]
    const droppedPdf = this.props.state.proposalPdfs[source.index]

    proposalPdfs.splice(source.index, 1)
    proposalPdfs.splice(destination.index, 0, droppedPdf)

    this.setState({
      proposalPdfs
    })
  }
  render() {
    return (
      <div className="flex w-full mx-auto h-full place-content-center">
        <DragDropContext onDragEnd={this.onDragEnd}>
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
        </DragDropContext>
      </div>
    );
  }
}

export default PopPdfPick;