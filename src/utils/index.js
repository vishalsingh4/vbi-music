import { artistList, albumList } from '../mockData';

const filteredDataList = (songList) => {
  /**
   * Adding dummy album names to the placeholder api response data
   */

  albumList.map((album) => {
    songList.map((song) => {
      if (album.id === song.albumId) {
        song['album'] = album.name;
      }
    });
  });

  /**
   * Adding dummy artist names to the placeholder api response data
   */

  artistList.map((artist) => {
    songList.map((song) => {
      if (artist.id === song.id) {
        song['artists'] = artist.name;
        song['playtime'] = artist.playtime;
      }
    });
  });

  /**
   * Adding album, artists and playtime to the rest of api response data
   */

  songList.map((song) => {
    if (!song.hasOwnProperty('album')) {
      song['album'] = 'Troy Boi Hits';
    }
    if (!song.hasOwnProperty('artists')) {
      song['artists'] = 'Trevor Hall';
    }
    if (!song.hasOwnProperty('playtime')) {
      song['playtime'] = '4mins 44sec';
    }
  });
  /**
   * Filtering top 100 song list data
   */

  songList = songList.filter((item) => item.id < 150);

  return songList;
};

const debouncedSearch = (fn, delay) => {
  let timeoutId;
  return (...args) => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(() => {
      fn(...args);
    }, delay);
  };
};

const formatDate = (date) => {
  let formattedDate;
  let formattedTime;
  
  formattedDate = [
    date.getFullYear(),
    ('0' + (date.getMonth() + 1)).slice(-2),
    ('0' + date.getDate()).slice(-2)
  ].join('-');

  formattedTime =
    ('0' + date.getHours()).slice(-2) +
    ':' +
    ('0' + date.getMinutes()).slice(-2) +
    ':' +
    ('0' + date.getSeconds()).slice(-2);

  return formattedDate + ' ' + formattedTime;
};

const shuffleArray = array  => {
  for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

export { filteredDataList, debouncedSearch, formatDate, shuffleArray };
