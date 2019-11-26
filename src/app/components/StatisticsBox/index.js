import React from 'react';
import PropTypes from 'prop-types';

import styles from './styles.module.scss';

function StatisticsBox({ number, text }) {
  return (
    <div className={`column ${styles.sidebar}`}>
      <span className={styles.number}>{number}</span>
      <span className={styles.text}>{text}</span>
    </div>
  );
}

StatisticsBox.propTypes = {
  number: PropTypes.number,
  text: PropTypes.string
};

export default StatisticsBox;
