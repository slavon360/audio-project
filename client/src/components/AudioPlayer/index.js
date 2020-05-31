import React, { useContext, useState } from 'react';
import cx from 'classnames';

import NextButton from './components/NextButton';
import PreviousButton from './components/PreviousButton';
import PlayButton from './components/PlayButton';
import ProgressBar from './components/ProgressBar';

import PlayerContext from '../../context/player-context';
import { getArtistNames } from '../../utils';

import styles from './AudioPlayer.module.css';

const AudioPlayer = ({
	current_track,
	nextTrack,
	previousTrack
}) => {
	const [progress_bar_width, setProgressBarWidth] = useState(0);
	const [duration, setDuration] = useState(null);
	const [current_time, setCurrentTime] = useState(null);
	const {
		audio_api,
		playing_track_id,
		playTrack,
		pauseTrack
	} = useContext(PlayerContext);
	const onPlayTrack = () => playTrack(current_track.fileName, current_track.id);
	const generateTime = () => {
		let durmin = Math.floor(audio_api.duration / 60);
		let dursec = Math.floor(audio_api.duration - durmin * 60);
		let curmin = Math.floor(audio_api.currentTime / 60);
		let cursec = Math.floor(audio_api.currentTime - curmin * 60);

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
	let artistNames;

	if (current_track && current_track.artist) {
		artistNames = getArtistNames(current_track.artist);
	}
	
	if (audio_api) {
		audio_api.ontimeupdate = function() {
			const width = 100 / audio_api.duration * audio_api.currentTime;
			setProgressBarWidth(width);
			console.log(audio_api.duration, ' currentTime: ', audio_api.currentTime);
			generateTime();
		  };
	}
	
	return (
		<div className={cx(styles.AudioPlayerWrp, { [styles.Showed]: current_track })}>
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
						<div className={styles.ArtistName}>{ artistNames }</div>
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
							playing={playing_track_id}
							onPlayTrack={onPlayTrack}
							onPauseTrack={pauseTrack}
						/>
					</div>
					<div className={styles.ProgressBarWrapper}>
						<div className={styles.ProgressDuration}>{duration}</div>
						<ProgressBar progress_bar_width={progress_bar_width}/>
						<div className={styles.ProgressCurrentTime}>{current_time}</div>
					</div>
				</div>
			}
		</div>
	);
};

export default AudioPlayer;