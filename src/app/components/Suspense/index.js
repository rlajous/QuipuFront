import React, { Suspense } from 'react';
import PropTypes from 'prop-types';

import Loading from '../Loader';

import styles from './styles.module.scss';

function CustomSuspense({ fallback, children }) {
  return <Suspense fallback={fallback}>{children}</Suspense>;
}

CustomSuspense.defaultProps = {
  fallback: (
    <div className={styles.container}>
      <Loading />
    </div>
  )
};

CustomSuspense.propTypes = {
  fallback: PropTypes.element
};

export default CustomSuspense;
