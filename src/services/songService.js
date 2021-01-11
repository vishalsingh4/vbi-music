import { axiosInstance } from './axiosConfig';

const getAllSongs = () => {
  return axiosInstance.get('/photos');
};

const getAllAlbums = () => {
    return axiosInstance.get('/albums');
};

export { 
    getAllSongs, 
    getAllAlbums,
};
