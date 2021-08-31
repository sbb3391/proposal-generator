import React from 'react';
import ReactLoading from 'react-loading';


function Loading(props) {
  return (
    <>
      <ReactLoading type={"spin"} color="#fff" height={'20%'} width={'20%'}/>
    </>
  );
}

export default Loading;