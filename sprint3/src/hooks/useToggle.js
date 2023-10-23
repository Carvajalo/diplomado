import React from 'react'

const useToggle = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const toggle = () => setIsOpen(!isOpen);
  return [isOpen, setIsOpen, toggle]
}

export default useToggle