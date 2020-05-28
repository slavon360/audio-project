import React, { useState, useEffect } from 'react';

import PlayerContext from '../../context/player-context';
import AudioPlayer from '../AudioPlayer';
import styles from './Layer.module.css';

const Layer = ({ children }) => {
	const [ current_track, setCurrentTrack ] = useState(null);
	const [ playing_track_id, setPlayingTrackId ] = useState(null);
	const [ tracks, setTracksList ] = useState(null);
	const [ audio_api, setAudioApi ] = useState(null);
	const initAudio = () => {
		const audio_instance = new Audio();

		setAudioApi(audio_instance);
	};
	const playTrack = (fileName, track_id) => {
		const audio_src = audio_api.src;
		const current_src = `${process.env.REACT_APP_SERVER_HOST_URL}/audio/${fileName}`;

		setPlayingTrackId(track_id);

		if (audio_src !== encodeURI(current_src)) {
			audio_api.src = current_src;
		}
		
		audio_api.play();
	};
	const pauseTrack = () => {
		setPlayingTrackId(null);
		audio_api.pause();
	};
	const nextTrack = () => {
		const { id } = current_track;

		tracks.find((track, index) => {
			if (id === track.id) {
				const next_track = tracks[index + 1];
				const first_track = tracks[0];

				console.log(next_track, first_track, index);

				if (next_track) {
					setCurrentTrack(next_track);
					audio_api.src = `${process.env.REACT_APP_SERVER_HOST_URL}/audio/${next_track.fileName}`;

					if (playing_track_id) {
						setPlayingTrackId(next_track.id);
						audio_api.play();
					}
				} else {
					setCurrentTrack(first_track);
					audio_api.src = `${process.env.REACT_APP_SERVER_HOST_URL}/audio/${first_track.fileName}`;

					if (playing_track_id) {
						setPlayingTrackId(first_track.id);
						audio_api.play();
					}
				}
				return true;
			}
		});
	}
	const previousTrack = () => {
		const { id } = current_track;

		tracks.find((track, index) => {
			if (id === track.id) {
				const prev_track = tracks[index - 1];
				const last_track = tracks[tracks.length - 1];

				if (prev_track) {
					setCurrentTrack(prev_track);
					audio_api.src = `${process.env.REACT_APP_SERVER_HOST_URL}/audio/${prev_track.fileName}`;

					if (playing_track_id) {
						setPlayingTrackId(prev_track.id);
						audio_api.play();
					}
				} else {
					setCurrentTrack(last_track);
					audio_api.src = `${process.env.REACT_APP_SERVER_HOST_URL}/audio/${last_track.fileName}`;

					if (playing_track_id) {
						setPlayingTrackId(last_track.id);
						audio_api.play();
					}
				}
				return true;
			}
		});
	}

	useEffect(() => {
		if (playing_track_id) {
			const active_track = tracks.find(track => track.id === playing_track_id);

			setCurrentTrack(active_track);
		}
	}, [playing_track_id]);

	if (!audio_api) {
		initAudio();
	}
	
	return (
		<PlayerContext.Provider
			value={{
				playing_track_id,
				audio_api,
				tracks,
				setPlayingTrackId,
				setTracksList,
				playTrack,
				pauseTrack
			}}
		>
			<div className={styles.LayerWrp}>
				{ children }
				<AudioPlayer
					current_track={current_track}
					nextTrack={nextTrack}
					previousTrack={previousTrack}
				/>
			</div>
		</PlayerContext.Provider>
		);
};

export default Layer;