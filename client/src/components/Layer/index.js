import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';

import PlayerContext from '../../context/player-context';
import AudioPlayer from '../AudioPlayer';
import AudioService from '../../Audio';
import styles from './Layer.module.css';

const Layer = ({ children, history }) => {
	const [ should_refetch_tracks, setShouldRefetchTracksValue ] = useState(false);
	const [ current_track, setCurrentTrack ] = useState(false);
	const [ playing_track_id, setPlayingTrackId ] = useState(null);
	const [ tracks, setTracksList ] = useState(null);
	const [ audio_api, setAudioApi ] = useState(null);
	const [ loading_track, setLoadingState] = useState(false);
	const initAudio = () => {
		const audio_instance = new AudioService();

		setAudioApi(audio_instance);
	};
	const playTrack = async (fileName, track_id, force_stop) => {
		const audio_src = audio_api.audio_src;
		const current_src = encodeURI(`${process.env.REACT_APP_SERVER_HOST_URL}/audio/${fileName}`);

		setPlayingTrackId(track_id);

		console.trace(audio_api)
		tracks.forEach(track => track.active_track = false);
		if (audio_api.is_playing) {
			console.log('stopTrackAndClearTimeData')
			stopTrackAndClearTimeData();
		}

		if (audio_src !== current_src) {
			setLoadingState(true);

			await audio_api.loadSrc(current_src);

			setLoadingState(false);

			if (force_stop) {
				stopTrackAndClearTimeData();
			}

			return audio_api.playAudio();
		}

		audio_api.playAudio();
	};

	const stopTrackAndClearTimeData = () => {
		audio_api.stopAudio();
		audio_api.clearCurrentTime();
	}
	const pauseTrack = () => {
		setPlayingTrackId(null);
		audio_api.stopAudio();
	};

	const nextTrack = () => {
		const { id } = current_track;

		tracks.forEach((track, index) => {
			track.active_track = false;
			if (id === track.id) {
				const next_track = tracks[index + 1];
				const first_track = tracks[0];

				if (next_track) {
					// next_track.active_track = true;
					console.log(next_track, next_track.active_track);
					const { fileName, id } = next_track;

					playTrack(fileName, id, true);
				} else {
					// first_track.active_track = true;
					const { fileName, id } = first_track;

					playTrack(fileName, id, true);
				}
			}
		});
	}
	const previousTrack = () => {
		const { id } = current_track;

		tracks.forEach((track, index) => {
			track.active_track = false;
			if (id === track.id) {
				const prev_track = tracks[index - 1];
				const last_track = tracks[tracks.length - 1];

				if (prev_track) {
					console.log(prev_track);
					// prev_track.active_track = true;
					const { fileName, id } = prev_track;

					playTrack(fileName, id, true);
				} else {
					// last_track.active_track = true;
					const { fileName, id } = last_track;

					playTrack(fileName, id, true);
				}
			}
		});
	}
	
	useEffect(() => {
		if (playing_track_id) {
			const curr_track = tracks.find(track => track.id === playing_track_id);
			curr_track.active_track = true;
			setCurrentTrack(curr_track);
		}
	}, [playing_track_id]);

	// useEffect(() => {
	// 	const unlisten = history.listen((location, action) => {
	// 		if (location.pathname === '/') {
	// 			setShouldRefetchTracksValue(true);
	// 		}
	// 	});
	// 	return () => {
	// 		unlisten();
	// 	} 
	// });

	if (!audio_api) {
		initAudio();
	}
	
	return (
		<PlayerContext.Provider
			value={{
				playing_track_id,
				audio_api,
				tracks,
				should_refetch_tracks,
				loading_track,
				setPlayingTrackId,
				setTracksList,
				playTrack,
				pauseTrack,
				setShouldRefetchTracksValue
			}}
		>
			{audio_api &&
				<div className={styles.LayerWrp}>
					{ children }
					<AudioPlayer
						current_track={current_track}
						nextTrack={nextTrack}
						previousTrack={previousTrack}
						track_is_loading={loading_track}
					/>
				</div>
			}
		</PlayerContext.Provider>
		);
};

export default withRouter(Layer);