import React from 'react';

import PlayButton from '../../AudioPlayer/components/PlayButton';
import { getArtistNames } from '../../../utils';

import styles from './TrackPreview.module.css';

const TrackPreview = ({
	track: { title, album, artist, fileName, id },
	playTrack,
	pauseTrack,
	is_playing
}) => {
	const onPlayTrack = () => {
		playTrack(fileName, id);
	};

	const onPauseTrack = () => {
		pauseTrack();
	};

	const artistNames = getArtistNames(artist);
	
	return (
		<div className={styles.TrackPreviewWrp}>
			<div className={styles.TrackPreviewContainer}>
				<div className={styles.ArtistTitlePanel}>
					<div className={styles.ArtistName}>{ artistNames }</div>
					<div className={styles.TrackTitle}>{ title }</div>
				</div>
				<div className={styles.ButtonsPanel}>
					<PlayButton
						outer_class={styles.PlayButton}
						playing={is_playing}
						onPlayTrack={onPlayTrack}
						onPauseTrack={onPauseTrack}
					/>
				</div>
			</div>
		</div>
	)
};

export default TrackPreview;