import React from 'react';
import { t } from 'i18next';
import PropTypes from 'prop-types';
import Select from 'react-select';

import Loader from '../../components/Loader';

import styles from './styles.module.scss';

const options = [
  { value: 'day', label: t('Marketplace:daySelect') },
  { value: 'week', label: t('Marketplace:weekSelect') },
  { value: 'month', label: t('Marketplace:monthSelect') },
  { value: 'all', label: t('Marketplace:allSelect') }
];

function Statistics({ statistics, mapInfo, loading, onHandleChange }) {
  return (
    <div className={loading ? styles.loading : styles.app}>
      <div className={styles.header}>
        <h1 className={styles.title}>{t('Marketplace:title')}</h1>
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
