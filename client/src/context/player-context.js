import React from 'react';

export default React.createContext({
    audio_api: null,
    playing_track_id: null,
    tracks: null,
    should_refetch_tracks: false,
    loading_track: false,
    setAudioApi: (audio_api) => {},
    setPlayingTrackId: (playing_track_id) => {},
    setTracksList: (tracks) => {},
    setShouldRefetchTracksValue: (value) => {},
    playTrack: (fileName, track_id) => {},
    pauseTrack: () => {}
});