import React, { useContext, useEffect, useMemo } from 'react';
import gql from 'graphql-tag';
import { useQuery, useLazyQuery, useMutation } from '@apollo/react-hooks';

import PlayerContext from '../../context/player-context';
import TrackPreview from './TrackPreview';

import styles from './AudioList.module.css';

const GET_TRACKS = gql`
	{
		tracks {
			id
			title
			artist {
				name
				id
			}
			album
			rate
			fileName
			picture
		}
	}
`;

const AudioList = ({ history }) => {
	const { loading: loading_tracks, error: error_tracks, data: data_tracks = {}, refetch } = useQuery(GET_TRACKS);
	const { tracks } = data_tracks;
	const {
		playing_track_id,
		tracks: tracks_list,
		should_refetch_tracks,
		setTracksList,
		playTrack,
		pauseTrack,
		setShouldRefetchTracksValue
	} = useContext(PlayerContext);
	const renderTracks = (tracks) => (
		<div className={styles.AudioListWrp}>
			{tracks.map((track, index) => (
				<TrackPreview
					key={track.id}
					list_number={index + 1}
					track={track}
					is_playing={playing_track_id === track.id}
					playTrack={playTrack}
					pauseTrack={pauseTrack}
				/>
			))}
		</div>);
	
	useEffect(() => {
		if (tracks) {
			setTracksList(tracks);
		}
	}, [tracks]);

	if (should_refetch_tracks && tracks) {
		refetch()
			.then(() => {
				setShouldRefetchTracksValue(false);
			})
			.catch(error => {
				console.warn(error);
			});
	}

	if (tracks && tracks.length) {
		return renderTracks(tracks);
	}

	else if (loading_tracks) {
		return <div>loading...</div>;
	}

	else if (error_tracks) {
		console.log(error_tracks);
		return <div>Error!</div>;
	}

	else {
		console.log('else');
		return null;
	}
};

export default AudioList;