import React from 'react';

import styles from './Preloader.module.css';

const Preloader = () => (
	<div className={styles.Loader}>
		<div className={styles.Bounce}></div>
		<div className={styles.Bounce}></div>
		<div className={styles.Bounce}></div>
		<div className={styles.DotText}></div>
	</div>
);

export default Preloader;