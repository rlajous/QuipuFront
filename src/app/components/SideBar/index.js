import React, { Fragment } from 'react';
import { t } from 'i18next';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import Drawer from '@material-ui/core/Drawer';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/Close';
import Divider from '@material-ui/core/Divider';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import SettingsIcon from '@material-ui/icons/Settings';
import DriveEtaIcon from '@material-ui/icons/DriveEta';
import EqualizerIcon from '@material-ui/icons/Equalizer';
import HomeIcon from '@material-ui/icons/Home';

import Routes from '../../../constants/routes';
import defaultLogo from '../../assets/rappi-logo.png';
import logo from '../../assets/logo_with_name.png';

import styles from './styles.module.scss';

function SideBar({ image, onDrawerClose, open, toggleDrawer }) {
  return (
    <Fragment>
      <div className="responsive">
        <ClickAwayListener onClickAway={toggleDrawer}>
          <SwipeableDrawer
            className={styles.drawer}
            variant="persistent"
            anchor="left"
            open={open}
            onClick={toggleDrawer()}
            onKeyDown={toggleDrawer()}
            classes={`responsive ${styles.drawerPaper}`}
          >
            <div className={`${styles.drawerHeader}`}>
              <span className={styles.route}>{t('Routes:company')}</span>
              <IconButton onClick={onDrawerClose}>
                <ChevronLeftIcon />
              </IconButton>
            </div>
            <img src={image || defaultLogo} alt="Logo" className={`${styles.logo}`} />
            <Divider />
            <NavLink exact to={Routes.HOME} className={styles.routeContainer} activeClassName={styles.bold}>
              <HomeIcon />
              <span className={styles.route}>{t('Routes:home')}</span>
            </NavLink>
            <Divider />
            <NavLink to={Routes.CARS} className={styles.routeContainer} activeClassName={styles.bold}>
              <DriveEtaIcon />
              <span className={styles.route}>{t('Routes:cars')}</span>
            </NavLink>
            <Divider />
            <NavLink to={Routes.STATISTICS} className={styles.routeContainer} activeClassName={styles.bold}>
              <EqualizerIcon />
              <span className={styles.route}>{t('Routes:stats')}</span>
            </NavLink>
            <Divider />
            <NavLink
              to={Routes.CONFIGURATION}
              className={styles.routeContainer}
              activeClassName={styles.bold}
            >
              <SettingsIcon />
              <span className={styles.route}>{t('Routes:config')}</span>
            </NavLink>
            <Divider />
          </SwipeableDrawer>
        </ClickAwayListener>
      </div>
      <div className="not-responsive">
        <Drawer
          className={styles.drawer}
          variant="persistent"
          anchor="left"
          open
          classes={`not-responsive ${styles.drawerPaper}`}
        >
          <div className={`${styles.drawerHeader} ${styles.mainLogoContainer}`}>
            <img src={logo} alt="Logo" className={`${styles.mainLogo}`} />
          </div>
          <span className={styles.route}>{t('Routes:company')}</span>
          <img src={image || defaultLogo} alt="Logo" className={`${styles.logo}`} />
          <NavLink exact to={Routes.HOME} className={styles.routeContainer} activeClassName={styles.bold}>
            <HomeIcon />
            <span className={styles.route}>{t('Routes:home')}</span>
          </NavLink>
          <NavLink to={Routes.CARS} className={styles.routeContainer} activeClassName={styles.bold}>
            <DriveEtaIcon />
            <span className={styles.route}>{t('Routes:cars')}</span>
          </NavLink>
          <NavLink to={Routes.STATISTICS} className={styles.routeContainer} activeClassName={styles.bold}>
            <EqualizerIcon />
            <span className={styles.route}>{t('Routes:stats')}</span>
          </NavLink>
          <NavLink to={Routes.CONFIGURATION} className={styles.routeContainer} activeClassName={styles.bold}>
            <SettingsIcon />
            <span className={styles.route}>{t('Routes:config')}</span>
          </NavLink>
        </Drawer>
      </div>
    </Fragment>
  );
}

SideBar.propTypes = {
  image: PropTypes.string,
  open: PropTypes.bool,
  toggleDrawer: PropTypes.func,
  onDrawerClose: PropTypes.func
};

export default SideBar;
