import React from 'react';
import cx from 'classnames';

import PlayButton from '../../AudioPlayer/components/PlayButton';
import { getArtistNames } from '../../../utils';

import styles from './TrackPreview.module.css';

const TrackPreview = ({
	list_number,
	track: { title, artist, fileName, id, active_track },
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
			<div className={cx(styles.TrackPreviewContainer, {
				[styles.Playing]: is_playing,
				[styles.Active]: active_track
			})}>
				<span className={styles.ListNumber}>{list_number})</span>
				<div className={styles.ArtistTitlePanel}>
					<div className={styles.ArtistName} title={artistNames}>{ artistNames }</div>
					<div className={styles.TrackTitle} title={title}>{ title }</div>
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