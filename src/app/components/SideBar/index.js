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
import StoreIcon from '@material-ui/icons/Store';
import ReceiptIcon from '@material-ui/icons/Receipt';
import AccountBalanceWalletIcon from '@material-ui/icons/AccountBalanceWallet';

import Routes from '../../../constants/routes';
import defaultLogo from '../../assets/logo_with_name.png';

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
            onOpen={toggleDrawer}
            onClose={toggleDrawer}
            onClick={toggleDrawer()}
            onKeyDown={toggleDrawer()}
          >
            <div className={`${styles.drawerHeader}`}>
              <IconButton onClick={onDrawerClose}>
                <ChevronLeftIcon />
              </IconButton>
            </div>
            <img src={image || defaultLogo} alt="Logo" className={`${styles.logo}`} />
            <Divider />
            <NavLink exact to={Routes.Wallet} className={styles.routeContainer} activeClassName={styles.bold}>
              <AccountBalanceWalletIcon />
              <span className={styles.route}>{t('Routes:Wallet')}</span>
            </NavLink>
            <Divider />
            <NavLink to={Routes.Orders} className={styles.routeContainer} activeClassName={styles.bold}>
              <ReceiptIcon />
              <span className={styles.route}>{t('Routes:orders')}</span>
            </NavLink>
            <Divider />
            <NavLink to={Routes.MarketPlace} className={styles.routeContainer} activeClassName={styles.bold}>
              <StoreIcon />
              <span className={styles.route}>{t('Routes:marketplace')}</span>
            </NavLink>
            <Divider />
            <NavLink
              to={Routes.Configuration}
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
        <Drawer className={styles.drawer} variant="persistent" anchor="left" open>
          <img src={image || defaultLogo} alt="Logo" className={`${styles.logo}`} />
          <Divider />
          <NavLink exact to={Routes.Wallet} className={styles.routeContainer} activeClassName={styles.bold}>
            <AccountBalanceWalletIcon />
            <span className={styles.route}>{t('Routes:Wallet')}</span>
          </NavLink>
          <Divider />
          <NavLink to={Routes.Orders} className={styles.routeContainer} activeClassName={styles.bold}>
            <ReceiptIcon />
            <span className={styles.route}>{t('Routes:orders')}</span>
          </NavLink>
          <Divider />
          <NavLink to={Routes.MarketPlace} className={styles.routeContainer} activeClassName={styles.bold}>
            <StoreIcon />
            <span className={styles.route}>{t('Routes:marketplace')}</span>
          </NavLink>
          <Divider />
          <NavLink to={Routes.Configuration} className={styles.routeContainer} activeClassName={styles.bold}>
            <SettingsIcon />
            <span className={styles.route}>{t('Routes:config')}</span>
          </NavLink>
          <Divider />
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
