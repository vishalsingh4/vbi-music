import { createSelector } from 'reselect';

const selectSongsModel = (state) => state.songs;

const selectAllSongs = createSelector(selectSongsModel, (item) => item.songs);

const selectPlaylist = createSelector(selectSongsModel, (item) => item.playlist);

const selectLoadingState = createSelector(selectSongsModel, item => item.isLoading);

export { selectAllSongs, selectLoadingState, selectPlaylist };
