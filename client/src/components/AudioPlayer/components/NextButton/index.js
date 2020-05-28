import React from 'react';
import cx from 'classnames';

import NextIcon from '../../../Icons/NextIcon';
import styles from './NextButton.module.css';

const NextButton = ({ nextTrack, outer_class }) => (
    <button className={cx(styles.NextButtonWrp, outer_class)} onClick={nextTrack}>
        <NextIcon/>
    </button>
);

export default NextButton;