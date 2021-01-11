import React, { useState, useEffect, useLayoutEffect, Fragment } from 'react';
import { shallowEqual, useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';

import SongDetailCard from '../SongDetailCard';

import { selectAllSongs, selectPlaylist } from '../../selectors';

import { debouncedSearch, filteredDataList, shuffleArray } from '../../utils';
import { useParams } from 'react-router-dom';

const CreatePlaylistBtn = styled.button`
  width: 10rem;
  height: 3rem;
  border: 1px solid #e5e5e5;
  margin: 1rem 0.5rem;
  background-color: ${(props) => (props.selected ? '#00ff00' : '#282828')};
  color: ${(props) => (props.selected ? '#000000' : '#faebd7')};
  border-radius: 1rem;
  cursor: pointer;
  font-size: 1rem;
`;

const PlayListDetailComponent = () => {
  const [songs, setSongs] = useState([]);
  const [addSongContainer, showAddSongContainer] = useState(false);
  const [selectedPlaylist, setSelectedPlaylist] = useState([]);
  const songList = useSelector(selectAllSongs, shallowEqual);
  const playlist = useSelector(selectPlaylist, shallowEqual);
  const { id: playlistId } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    showPlaylistSongs();
  }, []);

  useLayoutEffect(() => {
    setSongs(songList);
    document.getElementsByClassName('main-component')[0].className =
      'main-component mixin-remove-scrollY';
  }, [songList]);

  const handleChange = (e) => {
    e.preventDefault();
    const searchQuery = e.target.value.toLowerCase();
    let filteredList = [];
    if (searchQuery === '') {
      songList.map((item) => {
        playlist.map((playlistItem) => {
          if (playlistItem.id === playlistId) {
            playlistItem.songs.map((songItem) => {
                if(songItem.title !== item.title) {
                    filteredList.push(item);
                }
            });
          }
        });
      });
      setSongs(filteredList);
    } else {
      filteredList = songs.filter(
        (item) =>
          item.title.toLowerCase().indexOf(searchQuery) !== -1 ||
          item.artists.toLowerCase().indexOf(searchQuery) !== -1 ||
          item.album.toLowerCase().indexOf(searchQuery) !== -1
      );
      setSongs(filteredList);
    }
  };

  const handleAddClick = () => {
    showAddSongContainer(true);
  };

  const handleAddTrackClick = (song) => {
    dispatch.songs.asyncAddSongToPlaylist({ playlistId, song });
    const filteredList = songs.filter((item) => item.title !== song.title);
    setSongs(filteredList);
  };

  const handleRemoveTrackClick = async (song) => {
    await dispatch.songs.asyncRemoveTrackFromPlaylist({ playlistId, song });
    await showPlaylistSongs();
  };

  const showPlaylistSongs = () => {
    showAddSongContainer(false);
    let currentPlaylistSongs = [];
    playlist.map((item) => {
      if (item.id === playlistId) {
        currentPlaylistSongs = item.songs;
      }
    });
    setSelectedPlaylist(shuffleArray(currentPlaylistSongs));
  };

  return (
    <div className="playlist-detail">
      <div className="btn-container">
        <CreatePlaylistBtn
          selected={!addSongContainer}
          onClick={() => showPlaylistSongs()}
        >
          Shuffle Play
        </CreatePlaylistBtn>
        <CreatePlaylistBtn
          onClick={() => handleAddClick()}
          selected={addSongContainer}
        >
          Add Song
        </CreatePlaylistBtn>
      </div>
      <div className="add-songContainer">
        <div className="songList-wrapper">
          {addSongContainer ? (
            <Fragment>
              <input
                type="text"
                placeholder="Search for songs..."
                className="search-container"
                onChange={(e) => debouncedSearch(handleChange(e), 1000)}
              />
              {songs &&
                songs.map((item, index) => (
                  <SongDetailCard
                    key={index}
                    {...item}
                    addSong
                    onAddTrackClick={() => handleAddTrackClick(item)}
                  />
                ))}
            </Fragment>
          ) : (
            selectedPlaylist &&
            selectedPlaylist.map((item, index) => (
              <SongDetailCard key={index} {...item} removeSong onRemoveTrackClick={() => handleRemoveTrackClick(item)} />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default PlayListDetailComponent;
