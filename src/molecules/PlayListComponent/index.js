import React, { useState } from 'react';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import styled from 'styled-components';

import Modal from '../../atoms/Modal';

import { formatDate } from '../../utils';

import { selectPlaylist } from '../../selectors';

const PlayListWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const CreatePlaylistBtn = styled.button`
  width: 10rem;
  height: 3rem;
  border: 1px solid #e5e5e5;
  margin: 1rem 0.5rem;
  background-color: #00ff00;
  color: #000000;
  border-radius: 1rem;
  cursor: pointer;
  font-size: 1rem;
`;

const PlaylistCard = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border: 1px solid #e5e5e5;
  padding: 1.5rem;
  box-shadow: 5px 10px 18px #888888;
  margin: 1rem 1rem 1rem 0;
  border-radius: 1rem;
  cursor: pointer;
`;

const PlayListComponent = ({ history }) => {
  const [showModal, setShowModal] = useState(false);
  const playlistList = useSelector(selectPlaylist, shallowEqual);

  const dispatch = useDispatch();

  const handleAdd = (playlistName) => {
    setShowModal(false);
    dispatch.songs.addPlaylist({
      id: uuidv4(),
      title: playlistName,
      createdAt: formatDate(new Date()),
      songs: [],
    });
  };

  return (
    <PlayListWrapper className="playlist-component">
      {showModal && (
        <Modal
          title="Add Playlist"
          buttonName="Add"
          onClick={(playlistName) => handleAdd(playlistName)}
          onClose={() => setShowModal(false)}
        />
      )}
      <CreatePlaylistBtn
        className={showModal ? 'mixin-bg-blur' : ''}
        onClick={() => setShowModal(true)}
      >
        {' '}
        Create Playlist{' '}
      </CreatePlaylistBtn>
      {playlistList &&
        playlistList.map((item, index) => (
          <PlaylistCard
            className={
              showModal ? 'mixin-bg-blur playlist-card' : 'playlist-card'
            }
            key={index}
            onClick={() => history.push(`/playlists/${item.id}`)}
          >
            <span>{item.title}</span>
            <span>{item.createdAt}</span>
          </PlaylistCard>
        ))}
    </PlayListWrapper>
  );
};

export default PlayListComponent;
