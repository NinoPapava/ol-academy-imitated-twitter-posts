import React from 'react';

const ClickPopup = ({ children, onClose }) => {

  const handleClick = (event) => {
    event.stopPropagation();
    onClose();
  }

  return (
    <div onClick={handleClick}>
      {children}
    </div>
  );
}

export { ClickPopup };