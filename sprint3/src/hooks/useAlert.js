import { useState } from 'react';
import { toast } from 'react-toastify';

const defaultOptions = {
  autoClose: 1600,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: "light",
}

export const useAlert = () => {

  const openAlert = ({ type = "success", message, position, ...rest }) => {
    toast.dismiss() // Cancelar la alerta anterior
    return toast?.[type](message, {
      ...defaultOptions,
      position: position ?? 'top-center',
      ...rest,
    })
  }

  return {
    openAlert,
  }
};