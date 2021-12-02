import React, { Component } from 'react';
import numeral from 'numeral';
import { proposalPdf } from '../pdf/proposalPdf'
import { connect } from 'react-redux';
import { editMachine, addImageToDatabase } from '../actions/fetches'
import { useHistory } from 'react-router-dom'
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import S3 from 'react-aws-s3';
import { test } from '../pdf/test'

pdfMake.vfs = pdfFonts.pdfMake.vfs;

const MachineOverview = (props) => {

  const history = useHistory();

  const renderSaveChangesButton = totalPrice => { 
    if (props.machine.showSave && props.machineType !== "preview") {

      return(<button onClick={() => props.saveMachine(props.machine)} className="border border-black rounded-md w-36 mx-auto bg-green-500 text-white bold cursor-pointer">Save Changes</button>)
    }
  }

  const renderSaveMachinePreviewButton = () => {
    if (props.machineType === "preview") {
      return(<button onClick={() => props.toggleMachineSave(props.machine, props.saveMachine)} className="border border-black rounded-md w-36 mx-auto bg-green-500 text-white bold cursor-pointer">Save Machine</button>)
    }
  }

  const editButtonClick = (event) => {
    const machine = props.machine

    if (props.machineType === "preview") {
      props.testing()
      history.push('/machines/preview/edit')
    } else {
      props.editMachine(machine, props.match.params.id, props.history, props.machineType) 
    }
  }

  const createPdf = () => {
    proposalPdf([props.machine], "preview")
    // test()
  }

  const renderImageOrFileInput = () => {
    if (props.machine.image_url) {
      console.log(process.env)
      return <img src={props.machine.image_url} />
    } else {
      return <input type="file" onChange={(e) => uploadImage(e)} />
    }
  }

  
  const uploadImage = (e) => {
    const config = {
      bucketName: 'machine-images-bucket',
      region: 'us-east-2',
      dirName: 'machine-images',
      accessKeyId: process.env.REACT_APP_AWS_ACCESS_ID_KEY,
      secretAccessKey: process.env.REACT_APP_AWS_SECRET_KEY
    }

    const selectedFile = e.target.files[0]

    const ReactS3Client = new S3(config);
    const newFileName =`${props.machine.image_key}.png`;

    
    ReactS3Client
    .uploadFile(selectedFile, newFileName)
    .then(data => {
      addImageToDatabase({key: props.machine.image_key, url: data.location})
    })
    .catch(err => {
      console.log(config)
      console.error(err)
    })
  }

  let priceArray = [];

  if (props.machine.assemblies.length > 0) {
    props.machine.assemblies.forEach(assembly => assembly.items.forEach( item => priceArray.push(item.unitPrice)))
  }

  const totalPrice = numeral(priceArray.reduce((a, b) => parseFloat(a) + parseFloat(b), 0)).format('000.00')
  
  return (
    <div className="flex flex-col space-y-6">
      <div className="place-items-center h-36">
          {renderImageOrFileInput()}
      </div>
      <div className="flex flex-col space-y-3">
        <h1 className="text-center">Machine Overview</h1>
        <h1 className="text-center">Total Price: {numeral(totalPrice).format('$0,0.00')}</h1>
        <button onClick={createPdf} className="border border-black rounded-md w-36 mx-auto">Generate PDF</button>
        <button onClick={editButtonClick} className="border border-black rounded-md w-36 mx-auto bg-red-500 text-white bold cursor-pointer">Edit Machine</button>
        { renderSaveChangesButton(totalPrice)}
        { renderSaveMachinePreviewButton() }
      </div>
      
    </div>
  );

}

const mapStateToProps = (state) => (
  {
  }
)

const mapDispatchToProps = (dispatch) => (
  {
    editMachine: (machine, proposalId, history, machineType) => dispatch(editMachine(machine, proposalId, history, machineType)),
    testing: () => dispatch({type: "TESTING"}),
    toggleMachineSave: (machine, saveMachine) => dispatch({type: "TOGGLE_MACHINE_SAVE", machine: machine, saveMachine: saveMachine}),
  }
)

export default connect(mapStateToProps, mapDispatchToProps)(MachineOverview);