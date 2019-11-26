import React, { Fragment } from 'react';
import { t } from 'i18next';
import PropTypes from 'prop-types';

import { formatNumber, currencyFormat } from '../../../utils/parsers';
import Loader from '../../components/Loader';
import CarMap from '../../components/Maps/CarMap';
import StatisticsBox from '../../components/StatisticsBox';

import styles from './styles.module.scss';

function Home({ campaign, mapInfo, loading }) {
  return (
    <div className={loading ? styles.loading : styles.app}>
      {loading && <Loader />}
      {!!campaign && !!mapInfo && (
        <Fragment>
          <div className={`row ${styles.boxContainer}`}>
            <StatisticsBox number={formatNumber(campaign.total.cars)} text={t('Home:cars')} />
            <StatisticsBox number={formatNumber(campaign.total.impresions)} text={t('Home:impresions')} />
            <StatisticsBox number={currencyFormat(campaign.total.km)} text={t('Home:km')} />
          </div>
          <CarMap cars={mapInfo} />
        </Fragment>
      )}
    </div>
  );
}

Home.propTypes = {
  campaign: PropTypes.objectOf(),
  loading: PropTypes.bool,
  mapInfo: PropTypes.objectOf()
};

export default Home;
