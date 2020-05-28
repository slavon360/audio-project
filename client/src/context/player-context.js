import React from 'react';

export default React.createContext({
    audio_api: null,
    playing_track_id: null,
    tracks: null,
    setAudioApi: (audio_api) => {},
    setPlayingTrackId: (playing_track_id) => {},
    setTracksList: (tracks) => {}
});