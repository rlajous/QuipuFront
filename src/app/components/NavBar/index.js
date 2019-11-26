import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import PropTypes from 'prop-types';

import logo from '../../assets/logo_with_name.png';

import styles from './styles.module.scss';

function NavBar({ onDrawerOpen, open }) {
  return (
    <div className={`row start responsive ${styles.navbar}`}>
      <div className={`${styles.hamburger}`}>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          onClick={onDrawerOpen}
          className={`${styles.menuButton} ${open && styles.hide}`}
        >
          <MenuIcon />
        </IconButton>
      </div>
      <div className={styles.logoContainer}>
        <img src={logo} alt="Logo" className={`${styles.logo}`} />
      </div>
    </div>
  );
}

NavBar.propTypes = {
  open: PropTypes.bool,
  onDrawerOpen: PropTypes.func
};

export default NavBar;
