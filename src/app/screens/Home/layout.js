import React from 'react';
import PropTypes from 'prop-types';

import Loader from '../../components/Loader';

import styles from './styles.module.scss';

function Home({ campaign, mapInfo, loading }) {
  return (
    <div className={loading ? styles.loading : styles.app}>
      {loading && <Loader />}
      {/* {!!campaign && !!mapInfo && (
        <>
        </>
      )} */}
    </div>
  );
}

Home.propTypes = {
  campaign: PropTypes.objectOf(),
  loading: PropTypes.bool,
  mapInfo: PropTypes.objectOf()
};

export default Home;
