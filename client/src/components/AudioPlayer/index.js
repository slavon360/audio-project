import React, { useContext } from 'react';
import cx from 'classnames';

import NextButton from './components/NextButton';
import PreviousButton from './components/PreviousButton';
import PlayButton from './components/PlayButton';
import PlayerContext from '../../context/player-context';
import { getArtistNames } from '../../utils';

import styles from './AudioPlayer.module.css';

const AudioPlayer = ({
	current_track,
	nextTrack,
	previousTrack
}) => {
	const {
		playing_track_id,
		playTrack,
		pauseTrack
	} = useContext(PlayerContext);
	let artistNames;

	if (current_track && current_track.artist) {
		artistNames = getArtistNames(current_track.artist);
	}

	const onPlayTrack = () => playTrack(current_track.fileName, current_track.id);
	
	return (
		<div className={cx(styles.AudioPlayerWrp, { [styles.Showed]: current_track })}>
			{current_track &&
				<div className={styles.AudioPlayerContainer}>
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
				</div>
			}
		</div>
	);
};

export default AudioPlayer;