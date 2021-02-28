import React from 'react';
import cx from 'classnames';

import PlayIcon from '../../../Icons/PlayIcon';
import PauseIcon from '../../../Icons/PauseIcon';
import styles from './PlayButton.module.css';

const PlayButton = ({
	onPlayTrack,
	onPauseTrack,
	outer_class,
	playing
}) => {
	const playHandler = () => {
		if (playing) {
			onPauseTrack();
		} else {
			onPlayTrack();
		}
	}
	return (
		<button playbuttonattribute="play" className={cx(styles.PlayButtonWrp, outer_class)} onClick={playHandler}>
			{playing ?
				<PauseIcon/> :
				<PlayIcon/>
			}
		</button>
	);
};

export default PlayButton;