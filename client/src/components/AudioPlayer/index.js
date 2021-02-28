import React, { useContext, useState, useRef, useEffect } from 'react';
import cx from 'classnames';

import NextButton from './components/NextButton';
import PreviousButton from './components/PreviousButton';
import PlayButton from './components/PlayButton';
import ProgressBar from './components/ProgressBar';
import Preloader from '../../components/Preloader';

import PlayerContext from '../../context/player-context';
import { getArtistNames } from '../../utils';

import styles from './AudioPlayer.module.css';

const AudioPlayer = ({
	current_track,
	nextTrack,
	previousTrack,
	track_is_loading
}) => {
	const [progress_bar_width, setProgressBarWidth] = useState(0);
	const [duration, setDuration] = useState(null);
	const [current_time, setCurrentTime] = useState(null);
	const [artistNames, setArtistNames] = useState(null);
	// const [progress_time, setProgressTime] = useState(0);
	// const [interval, setIntervalRef] = useState(null);
	const progress_ref = useRef(null);
	const {
		audio_api,
		playing_track_id,
		playTrack,
		pauseTrack
		// setPlayingTrackId
	} = useContext(PlayerContext);
	const onPlayTrack = () => playTrack(current_track.fileName, current_track.id);
	const generateTime = () => {
		let durmin = Math.floor(audio_api.duration / 60);
		let dursec = Math.floor(audio_api.duration - durmin * 60);
		let curmin = Math.floor(audio_api.current_time / 60);
		let cursec = Math.floor(audio_api.current_time - curmin * 60);

		if (durmin < 10) {
			durmin = `0${durmin}`;
		}
		if (dursec < 10) {
			dursec = `0${dursec}`;
		}
		if (curmin < 10) {
			curmin = `0${curmin}`;
		}
		if (cursec < 10) {
			cursec = `0${cursec}`;
		}
		setDuration(`${durmin}:${dursec}`);
		setCurrentTime(`${curmin}:${cursec}`);
	};

	const clickProgress = event => {
		const { current: { offsetLeft, offsetWidth } } = progress_ref;
		const start_point = window.innerWidth - (2 * offsetLeft + offsetWidth);
		const position = event.pageX - start_point;
		let progress_bar_width = 100 / offsetWidth * position;

		if (progress_bar_width > 100) {
			progress_bar_width = 100;
		} else if (progress_bar_width < 0) {
			progress_bar_width = 0;
		}

		audio_api.current_time = audio_api.duration * progress_bar_width / 100;
		audio_api.stopAudio();
		audio_api.playAudio();

		// setPlayingTrackId(current_track.id);
		setProgressBarWidth(progress_bar_width);
	}
	const audio_duration = audio_api.duration;

	// const updateCurrentTime = () => {
	// 	const interval = 1000;
	// 	let cur_time = 0;
	// 	const interval_ref = setInterval(() => {
	// 		cur_time += interval;
	// 		setProgressTime(cur_time);
	// 	}, interval);

	// 	setIntervalRef(interval_ref);
	// };

	// const clearIntervalRef = () => {
	// 	clearInterval(interval);
	// };
	useEffect(() => {
		if (!audio_duration) {
			setProgressBarWidth(0);
		}
	}, [audio_duration]);

	useEffect(() => {
		if (current_track && current_track.artist) {
			const names = getArtistNames(current_track.artist);
			setArtistNames(names);
		}
		
	}, [current_track]);

	useEffect(() => {
		// if (audio_api) {
			audio_api.ontimeupdate = () => {
				const width = 100 / audio_api.duration * audio_api.current_time;

				setProgressBarWidth(width);
				generateTime();
			};
			audio_api.onended = () => {
				nextTrack();
			}
		// }
	}, [audio_api.is_playing]);
	
	return (
		<div className={cx(styles.AudioPlayerWrp, {
			[styles.Showed]: current_track,
			[styles.TrackIsLoading]: track_is_loading
		})}>
			{track_is_loading && 
				<Preloader/>
			}
			{current_track &&
				<div className={styles.AudioPlayerContainer}>
					<div className={styles.AlbumImageCover}>
						<span>
							<div
								className={styles.AlbumImage}
								style={{
									backgroundImage: `url("${process.env.REACT_APP_SERVER_HOST_URL}/pictures/${current_track.picture}"),
									url("${process.env.REACT_APP_SERVER_HOST_URL}/pictures/album.jpg")`
								}}
							></div>
						</span>
					</div>
					<div className={styles.ArtistTitlePanel}>
						<div className={styles.ArtistName}>{artistNames}</div>
						<div className={styles.TrackTitle}>{ current_track.title }</div>
					</div>
					<div className={styles.ButtonsPanel}>
						<PreviousButton
							outer_class={styles.PrevButton}
							previousTrack={previousTrack}
						/>
						<NextButton
							outer_class={styles.NextButton}
							nextTrack={nextTrack}
						/>
						<PlayButton
							outer_class={styles.PlayButton}
							playing={audio_api.is_playing}
							onPlayTrack={onPlayTrack}
							onPauseTrack={pauseTrack}
						/>
					</div>
					<div className={styles.ProgressBarWrapper} ref={progress_ref}>
						<div className={styles.ProgressDuration}>{duration}</div>
						<ProgressBar clickProgress={clickProgress} progress_bar_width={progress_bar_width}/>
						<div className={styles.ProgressCurrentTime}>{current_time}</div>
					</div>
				</div>
			}
		</div>
	);
};

export default AudioPlayer;