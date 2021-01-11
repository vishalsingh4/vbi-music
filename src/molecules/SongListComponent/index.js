import React, { useEffect, useLayoutEffect, useState } from 'react';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';

import SongDetailCard from '../SongDetailCard';

import { selectAllSongs } from '../../selectors';

import { debouncedSearch } from '../../utils';

const SongListComponent = () => {
  const [songs, setSongs] = useState([]);
  const songList = useSelector(selectAllSongs, shallowEqual);
  const dispatch = useDispatch();

  useEffect(async () => {
    await dispatch.songs.asyncAddAllSongs();
  }, []);

  useLayoutEffect(() => {
    setSongs(songList);
  }, [songList]);

  const handleChange = (e) => {
    e.preventDefault();
    const searchQuery = e.target.value.toLowerCase();
    const filteredList = songList.filter(
      (item) =>
        item.title.toLowerCase().indexOf(searchQuery) !== -1 ||
        item.artists.toLowerCase().indexOf(searchQuery) !== -1 ||
        item.album.toLowerCase().indexOf(searchQuery) !== -1
    );
    setSongs(filteredList);
  };

  return (
    <div className="songList-wrapper">
      <input
        type="text"
        placeholder="Search for songs..."
        className="search-container"
        onChange={(e) => debouncedSearch(handleChange(e), 1000)}
      />
      {songs &&
        songs.map((item, index) => <SongDetailCard key={index} {...item} />)}
    </div>
  );
};

export default SongListComponent;
