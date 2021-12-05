import React, { Component } from 'react';
import numeral from 'numeral';
import { proposalPdf } from '../pdf/proposalPdf'
import { connect } from 'react-redux';
import { editMachine, addImageToDatabase, deleteMachine } from '../actions/fetches'
import { useHistory } from 'react-router-dom'
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import S3 from 'react-aws-s3';
import { test } from '../pdf/test'
import AWS from 'aws-sdk'

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

  const deleteAMachine = (event) => {
    if (event.target) {
      deleteMachine(event.target.id)
      .then( resp => resp.json())
      .then( machine => {
        props.removeMachine(machine.id)
      })
    }
  }

  const addDeleteButton = () => {
    if (props.machineType !== "preview") {
      return (
        <button onClick={(event) => deleteAMachine(event)} id={props.machine.machineId} className="border border-black rounded-md w-36 mx-auto bg-red-500 text-white bold cursor-pointer">Delete Machine</button>
      )
    }
  }

  const renderImageOrFileInput = () => {
    if (props.machine.image_url) {
      return <img src={props.machine.image_url} />
    } else {
      return <input type="file" onChange={(e) => uploadImage(e)} />
    }
  }

  // for more details see: 
  // // https://www.youtube.com/watch?v=_khupEk42zs&t=38s
  // const getPresignedURL = (fileName) => {
  //   return new Promise(resolve => {
  //     const s3 = new AWS.S3()
  //     const URL_EXPIRATION_SECONDS = 300
  //     const bucket = "machine-images-bucket"
      
  //     // Main Lambda entry point
  //     exports.handler = async (event) => {
  //       return await getUploadURL(event)
  //     }
      
  //     const getUploadURL = async function(event) {
  //       const Key = `${fileName}.png`
      
  //       // Get signed URL from S3
  //       const s3Params = {
  //         Bucket: bucket,
  //         Key,
  //         Expires: URL_EXPIRATION_SECONDS,
  //         ContentType: 'image/png',
  //       }
      
  //       const uploadURL = await s3.getSignedUrlPromise('putObject', s3Params)
      
  //       resolve(JSON.stringify({uploadURL: uploadURL}))
  //     }
  //   })
  // }

  
  const uploadImage = (e) => {
    const uploadURL = 'https://mq6wb7g4t7.execute-api.us-east-2.amazonaws.com/default/getPresignedURL?fileName=' + props.machine.image_key 

    fetch(uploadURL)
    .then( resp => resp.json())
    .then( json => {
      fetch(json.uploadURL, {
        headers: {
          "Content-Type": "image/png"
        },
        method: "PUT",
        body: e.target.files[0]
      })
      .then( () => {
        addImageToDatabase({key: props.machine.image_key, url: `https://machine-images-bucket.s3.us-east-2.amazonaws.com/machine-images/` + `${props.machine.image_key}.png`})
      })
    })

  
    // const selectedFile = e.target.files[0]

    // const ReactS3Client = new S3(config);
    // const newFileName =`${props.machine.image_key}.png`;

    
    // ReactS3Client
    // .uploadFile(selectedFile, newFileName)
    // .then(data => {
    //   addImageToDatabase({key: props.machine.image_key, url: data.location})
    // })
    // .catch(err => {
    //   alert(config.accessKeyId)
    //   alert(config.bucketName)
    //   console.error(err)
    // })
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
        <h1 className="text-center">Total Price: {numeral(totalPrice).format('$0,0.00')}</h1>
        <button onClick={editButtonClick} className="border border-black rounded-md w-36 mx-auto cursor-pointer">Edit Machine</button>
        { addDeleteButton() }
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
    removeMachine: (machineId) => dispatch({type: "REMOVE_MACHINE", machineId: machineId})
  }
)

export default connect(mapStateToProps, mapDispatchToProps)(MachineOverview);