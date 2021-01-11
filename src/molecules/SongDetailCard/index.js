import React from 'react';
import styled from 'styled-components';

const SongDetailWrapper = styled.div`
  display: flex;
  align-items: center;
  border: 1px solid #e5e5e5;
  padding: 1rem;
  box-shadow: 5px 10px 18px #888888;
  margin: 2rem 0;
  border-radius: 1rem;
`;

const SongDetailCard = ({
  title = '',
  artists = 'The Neighbourhood, Big Data, Joywave, Oliver',
  album = 'Justin Beiber Hits',
  thumbnailUrl = '',
  url = '',
  playtime = '2mins 32sec',
  addSong = false,
  onAddTrackClick,
  removeSong= false,
  onRemoveTrackClick
}) => (
  <SongDetailWrapper className={`${(addSong || removeSong) ? 'songDetail-wrapper mixin-pos-relative' : 'songDetail-wrapper'}`}>
    {addSong && <div className="add-icon" onClick={() => onAddTrackClick()}>+</div>}
    {removeSong && <div className="remove-icon" onClick={() => onRemoveTrackClick()}>-</div>}
    {addSong ? (
      <img
        src={thumbnailUrl}
        alt="Thumbnail 150*150"
        className="song-thumbnail"
      />
    ) : (
      <a href={url} _blank={url}>
        <img
          src={thumbnailUrl}
          alt="Thumbnail 150*150"
          className="song-thumbnail"
        />
      </a>
    )}
    <div className="song-details">
      <span>{title}</span>
      <span>{artists}</span>
      <span>{album}</span>
    </div>
    <div className="song-playtime">
      <span>{playtime}</span>
    </div>
  </SongDetailWrapper>
);

export default SongDetailCard;
