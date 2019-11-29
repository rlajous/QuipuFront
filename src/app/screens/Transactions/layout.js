import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { t } from 'i18next';
import PropTypes from 'prop-types';
import moment from 'moment';

import { currencyFormat } from '../../../utils/parsers';
import Loader from '../../components/Loader';

import styles from './styles.module.scss';

function Transactions({ transactions, loading, user, handleOpenBuyModal, handleOpenSellModal }) {
  return (
    <div className={loading ? styles.loading : styles.root}>
      <div className={styles.header}>
        <h1 className={styles.title}>{t('Transactions:title')}</h1>
      </div>
      <div className={styles.buttons}>
        <button type="button" onClick={handleOpenBuyModal} className={styles.buyButton}>
          {t('Marketplace:buy')}
        </button>
        <button type="button" onClick={handleOpenSellModal} className={styles.sellButton}>
          {t('Marketplace:sell')}
        </button>
      </div>
      <Paper className={styles.paper}>
        <Table size="medium">
          <TableHead className={styles.head}>
            <TableRow>
              <TableCell align="center" className={styles.cell}>
                {t('Transactions:type')}
              </TableCell>
              <TableCell align="center" className={styles.cell}>
                {t('Transactions:tokens')}
              </TableCell>
              <TableCell align="center" className={styles.cell}>
                {t('Transactions:price')}
              </TableCell>
              <TableCell align="center" className={styles.cell}>
                {t('Transactions:date')}
              </TableCell>
            </TableRow>
          </TableHead>
          {!!transactions && (
            <TableBody>
              {transactions.map(row => (
                <TableRow className={styles.row} key={row.name}>
                  <TableCell component="th" scope="row" align="center" className={styles.cell}>
                    {row.sellerId === user.uid ? t('Transactions:sell') : t('Transactions:buy')}
                  </TableCell>
                  <TableCell align="center" className={styles.cell}>
                    {row.tokens}
                  </TableCell>
                  <TableCell align="center" className={styles.cell}>
                    {currencyFormat(row.price)}
                  </TableCell>
                  <TableCell align="center" className={styles.cell}>
                    {moment(row.date._seconds).format('DD MMM YYYY')}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          )}
        </Table>
      </Paper>
      {loading && <Loader />}
    </div>
  );
}

Transactions.propTypes = {
  handleOpenBuyModal: PropTypes.func,
  handleOpenSellModal: PropTypes.func,
  loading: PropTypes.bool,
  // eslint-disable-next-line
  user:PropTypes.object,
  // eslint-disable-next-line
  transactions: PropTypes.array
};

export default Transactions;
