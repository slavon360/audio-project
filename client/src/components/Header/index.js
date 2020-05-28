import React from 'react';
import { NavLink } from 'react-router-dom';

import styles from './Header.module.css';

const Header = () => (
    <div className={styles.HeaderWrp}>
        <NavLink activeClassName={styles.ActiveLink} exact={true} to="/">Tracks</NavLink>
        <NavLink activeClassName={styles.ActiveLink} to="/add-audio">Add Track</NavLink>
    </div>
);

export default Header;