import { getAllSongs } from '../services';
import { filteredDataList } from '../utils';

const songs = {
  state: {
    songs: [],
    playlist: [],
    isLoading: false,
  },
  reducers: {
    isLoading(state, isLoading) {
      return {
        ...state,
        isLoading: isLoading,
      };
    },
    addAllSongs(state, songList) {
      return {
        ...state,
        songs: songList,
      };
    },
    addPlaylist(state, playlistObj) {
      return {
        ...state,
        playlist: [...state.playlist, playlistObj],
      };
    },
    addSongToPlaylist(state, {playlistId, song}) {
      const playlistCopy = Object.assign([], state.playlist);
      playlistCopy.map(item => {
        if(item.id === playlistId) {
          item.songs.push(song);
        }
      });
      return {
        ...state,
        playlist: playlistCopy
      }
    },
    removeSongFromPlaylist(state, {playlistId, song}) {
      const playlistCopy = Object.assign([], state.playlist);
      playlistCopy.map(item => {
        if(item.id === playlistId) {
          item.songs = item.songs.filter(songItem => (songItem.title !== song.title));
        }
      });
      return {
        ...state,
        playlist: playlistCopy
      }
    },
  },
  effects: {
    async asyncAddAllSongs() {
      this.isLoading(true);
      const songList = await getAllSongs();
      const filteredSongData = filteredDataList(songList.data);
      this.addAllSongs(filteredSongData);
      this.isLoading(false);
    },
    async asyncAddSongToPlaylist({playlistId, song}) {
      this.isLoading(true);
      this.addSongToPlaylist({playlistId, song});
      this.isLoading(false);
    },
    async asyncRemoveTrackFromPlaylist({playlistId, song}) {
      this.isLoading(true);
      this.removeSongFromPlaylist({playlistId, song});
      this.isLoading(false);
    },
  },
};

export default songs;
