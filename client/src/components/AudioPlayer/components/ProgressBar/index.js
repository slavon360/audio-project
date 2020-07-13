import React from 'react';

import styles from './ProgressBar.module.css';

const ProgressBar = ({ progress_bar_width, clickProgress }) => (
    <div className={styles.BarContainer} onClick={clickProgress}>
        <div className={styles.BarProgress} style={{width: `${progress_bar_width}%`}}></div>
    </div>
)

export default ProgressBar;