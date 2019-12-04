import React from 'react';
import PropTypes from 'prop-types';
import { t } from 'i18next';

import StatisticsBox from '../../components/StatisticsBox';
import Loader from '../../components/Loader';
import { propTypes } from '../../../redux/Auth/reducer';
import { propTypes as transactionsProptypes } from '../../../redux/Transactions/reducer';

import Transactions from './Components/Transactions';
import styles from './styles.module.scss';

function Wallet({
  user,
  transactions,
  loading,
  handleOpenBuyModal,
  handleOpenSellModal,
  onChangePage,
  page,
  totalPages
}) {
  return (
    <div className={loading ? styles.loading : styles.app}>
      <div className={styles.header}>
        <h1 className={styles.title}>{t('Wallet:title')}</h1>
      </div>
      <div className={styles.wallet}>
        <div className="column">
          <StatisticsBox number={user.tokens} text={t('Wallet:tokens')} />
          <div className={styles.buttons}>
            <button type="button" onClick={handleOpenBuyModal} className={styles.buyButton}>
              {t('Marketplace:buy')}
            </button>
            <button type="button" onClick={handleOpenSellModal} className={styles.sellButton}>
              {t('Marketplace:sell')}
            </button>
          </div>
        </div>
      </div>
      <div className={styles.header}>
        <h1 className={styles.title}>{t('Wallet:transactions')}</h1>
      </div>
      <div>
        <Transactions
          onChangePage={onChangePage}
          page={page}
          transactions={transactions}
          totalPages={totalPages}
          user={user}
          loading={loading}
        />
      </div>
      {loading && <Loader />}
    </div>
  );
}

Wallet.propTypes = {
  handleOpenBuyModal: PropTypes.func,
  handleOpenSellModal: PropTypes.func,
  loading: PropTypes.bool,
  page: PropTypes.number,
  totalPages: PropTypes.number,
  transactions: transactionsProptypes.transactions,
  user: propTypes.user,
  onChangePage: PropTypes.func
};

export default Wallet;
