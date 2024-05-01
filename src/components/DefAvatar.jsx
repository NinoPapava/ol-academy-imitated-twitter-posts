import React from 'react';
import Avatar from 'react-avatar';

const DefAvatar = ({ name }) => {

  const randomColor = `#${Math.floor(Math.random() * 16777215).toString(16)}`;


  return (
    <Avatar
      name={name}
      style={{ randomColor }}
      round={true}
      size="70"
    />
  );
}

export { DefAvatar }
