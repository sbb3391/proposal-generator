import React, { Component } from 'react';
import { connect } from 'react-redux';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

class PopWindow extends Component {

  renderDraggables = () => {
    const finalSpaceCharacters = [
      {
        id: 'gary',
        name: 'Gary Goodspeed',
      },
      {
        id: "joe",
        name: "Joe Bequette"
      }
    ]

    return finalSpaceCharacters.map(({id, name}, index) => {
      return(
        <Draggable key={id} draggableId={id} index={index}>
          {provided => (
            <li ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
            </li>
          )}
        </Draggable>
      )
    })
  }


  render() {
    return (
      <DragDropContext>

        <div onClick={this.props.togglePopWindow} id="popWindow" className="flex w-full h-full relative z-20">
          <div className="w-2/3 h-3/4 mx-auto border-black border-2 place-self-center bg-white">
            <div id="available-pdfs" className="flex flex-col w-full h-1/6 border-2 border-black space-y-2 py-3">
              <h1 className="text-center">Available PDF's:</h1>
              <div className="w-11/12 mx-auto h-5/6 bg-red-200">
              
              </div>
            </div>
            <div id="proposal-pdfs" className="w-full h-5/6 border-2 border-black">
                <Droppable dropableId="characters">
                  { (provided) => (
                    <ul className="characters" {...provided.droppableProps} ref={provided.innerRef}>
                      {this.renderDraggables()}
                    </ul>
                  )}
                </Droppable>
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