import React, { Fragment } from 'react';
import { t } from 'i18next';
import PropTypes from 'prop-types';
import Select from 'react-select';

import LineChart from '../../components/LineChartJs';
import PieChart from '../../components/PieChart';
import StatisticsBox from '../../components/StatisticsBox';
import HeatMap from '../../components/Maps/HeatMap';
import RouteMap from '../../components/Maps/RouteMap';
import Loader from '../../components/Loader';
import { formatNumber, currencyFormat } from '../../../utils/parsers';

import styles from './styles.module.scss';

const options = [
  { value: 'day', label: t('Statistics:daySelect') },
  { value: 'week', label: t('Statistics:weekSelect') },
  { value: 'month', label: t('Statistics:monthSelect') },
  { value: 'all', label: t('Statistics:allSelect') }
];

function Statistics({ statistics, mapInfo, loading, onHandleChange }) {
  return (
    <div className={loading ? styles.loading : styles.app}>
      <div className={styles.header}>
        <h1 className={styles.title}>{t('Statistics:title')}</h1>
        <Select
          options={options}
          className={styles.container}
          defaultValue={options[0]}
          onChange={onHandleChange}
          isDisabled={loading}
        />
      </div>
      {loading && (
        <div className={styles.loader}>
          <Loader />
        </div>
      )}
      {!!statistics && !!mapInfo && !loading && (
        <Fragment>
          <div className={`row ${styles.boxContainer}`}>
            <StatisticsBox number={formatNumber(statistics.total.km)} text={t('Statistics:km')} />
            <StatisticsBox
              number={formatNumber(statistics.total.impresions)}
              text={t('Statistics:impresions')}
            />
            <StatisticsBox number={currencyFormat(statistics.total.cost)} text={t('Statistics:cost')} />
          </div>
          <div className={styles.charts}>
            <LineChart data={statistics.kilometers} title={t('Statistics:kmBy')} />
            <PieChart data={statistics.kilometers} title={t('Statistics:percentage')} />
          </div>
          <div className={styles.charts}>
            <LineChart data={statistics.impresions} title={t('Statistics:impresionsBy')} />
            <PieChart data={statistics.impresions} title={t('Statistics:percentage')} />
          </div>
          <div className={styles.map}>
            <span className={styles.subTitle}>{t('Statistics:heatMap')}</span>
            <HeatMap data={mapInfo} />
          </div>
          <div className={styles.map}>
            <span className={styles.subTitle}>{t('Statistics:routeMap')}</span>
            <RouteMap routes={statistics.routes} />
          </div>
        </Fragment>
      )}
    </div>
  );
}

Statistics.propTypes = {
  loading: PropTypes.bool,
  mapInfo: PropTypes.objectOf(),
  statistics: PropTypes.objectOf(),
  onHandleChange: PropTypes.func
};

export default Statistics;
