import React, { useState } from 'react';

const Modal = ({ title = 'Create', buttonName = 'Submit', onClick, onClose }) => {
  const [playlistName, setPlaylistName] = useState('');
  return (
    <div className='modal'>
      <div className='close-icon' onClick={onClose}>X</div>
      <header>{title}</header>
      <input
        type="text"
        placeholder="Enter playlist name here..."
        onChange={(e) => setPlaylistName(e.target.value)}
      />
      <button type="button" onClick={() => onClick(playlistName)}>
        {buttonName}
      </button>
    </div>
  );
};

export default Modal;
