import React, { useEffect } from 'react';
const { forwardRef, useImperativeHandle } = React;
import { useSelector } from 'react-redux'
import { ToastContainer, toast } from 'react-toastify';

const defaultPosition = toast.POSITION.TOP_RIGHT;
const defaultType = 'info';


const ToastService = () => {

  const toastLocalData = useSelector(state => state.toastData);

  const fireToast = (title, type, position) => {
    const toastTitle = title || '';
    const toastType = type || defaultType;
    const toastPosition = position || defaultPosition;

    toast[toastType](toastTitle, {
      position: toastPosition,
    });
  };


  const notifyService = (title, type, position) => fireToast(title, type, position);
  
  useEffect( ()=> {
    if (toastLocalData) {
      console.log('fired', toastLocalData);
      notifyService(toastLocalData.title, toastLocalData.type);
    } 
  }, [toastLocalData] )
  
  return (
    <ToastContainer />
  );
};

export default ToastService;
