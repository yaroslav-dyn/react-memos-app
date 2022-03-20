import React from 'react';
const { forwardRef, useImperativeHandle } = React;
import { ToastContainer, toast } from 'react-toastify';

const defaultPosition = toast.POSITION.TOP_RIGHT;
const defaultType = 'info';


const ToastService = forwardRef((props, ref) => {
  
  const fireToast = (title, type, position) => {
    const toastType = type || defaultType;
    const toastTitle = title || '';
    const toastPosition = position || defaultPosition;

    toast[toastType](toastTitle, {
      position: toastPosition,
    });
  };

  useImperativeHandle(ref, () => ({
    notifyService: (title, type, position) => fireToast(title, type, position)
  }));

  return (
    <ToastContainer />
  );
});
export default ToastService;
