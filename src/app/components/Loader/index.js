import React from 'react';
import { BarLoader } from 'react-spinners';

import logo from '../../assets/loaderLogo.png';

import styles from './styles.module.scss';

function Loader() {
  return (
    <div className="column middle center">
      <img src={logo} alt="Logo" className={`${styles.logo}`} />
      <BarLoader sizeUnit="px" size={50} color="#09A29B" loading />
    </div>
  );
}

export default Loader;
