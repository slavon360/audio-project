import React from 'react';
import cx from 'classnames';

import PreviousIcon from '../../../Icons/PreviousIcon';
import styles from './PreviousButton.module.css';

const PreviousButton = ({ previousTrack, outer_class }) => (
    <button className={cx(styles.PreviousButtonWrp, outer_class)} onClick={previousTrack}>
        <PreviousIcon/>
    </button>
);

export default PreviousButton;