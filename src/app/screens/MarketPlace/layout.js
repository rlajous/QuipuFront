/* eslint-disable complexity */
import React from 'react';
import { t } from 'i18next';
import PropTypes from 'prop-types';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import ReactPaginate from 'react-paginate';
import moment from 'moment';

import { currencyFormat } from '../../../utils/parsers';
import Loader from '../../components/Loader';

import styles from './styles.module.scss';

function MarketPlace({
  buyers,
  sellers,
  loading,
  onHandleBuyers,
  onHandleSellers,
  onChangePage,
  totalPages,
  handleOpenBuyModal,
  handleOpenSellModal,
  page
}) {
  return (
    <div className={loading ? styles.loading : styles.app}>
      <div className={styles.header}>
        <h1 className={styles.title}>{t('Marketplace:title')}</h1>
      </div>
      <div className={styles.buttons}>
        <button type="button" onClick={handleOpenBuyModal} className={styles.buyButton}>
          {t('Marketplace:buy')}
        </button>
        <button type="button" onClick={handleOpenSellModal} className={styles.sellButton}>
          {t('Marketplace:sell')}
        </button>
      </div>
      <div className={styles.tableFilter}>
        <button
          type="button"
          onClick={onHandleBuyers}
          className={`${styles.button} ${buyers && buyers.length ? styles.selected : ''}`}
        >
          {t('Marketplace:buyers')}
        </button>
        <button
          type="button"
          onClick={onHandleSellers}
          className={`${styles.button} ${sellers && sellers.length ? styles.selected : ''}`}
        >
          {t('Marketplace:sellers')}
        </button>
      </div>
      <Paper className={styles.paper}>
        <Table size="medium">
          <TableHead className={styles.head}>
            <TableRow>
              <TableCell align="center" className={styles.cell}>
                {t('Orders:tokens')}
              </TableCell>
              <TableCell align="center" className={styles.cell}>
                {t('Orders:price')}
              </TableCell>
              <TableCell align="center" className={styles.cell}>
                {t('Orders:date')}
              </TableCell>
            </TableRow>
          </TableHead>
          {!loading && !!sellers && (
            <TableBody>
              {sellers.map(row => (
                <TableRow className={styles.row} key={row.uid}>
                  <TableCell align="center" className={styles.cell}>
                    {row.tokens}
                  </TableCell>
                  <TableCell align="center" className={styles.cell}>
                    {currencyFormat(row.price)}
                  </TableCell>
                  <TableCell align="center" className={styles.cell}>
                    {// eslint-disable-next-line
                      row.date ? moment.unix(row.date._seconds).format('DD-MM-YYYY') : moment().format('DD-MM-YYYY') 
                    }
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          )}
          {!loading && !!buyers && (
            <TableBody>
              {buyers.map(row => (
                <TableRow className={styles.row} key={row.name}>
                  <TableCell align="center" className={styles.cell}>
                    {row.tokens}
                  </TableCell>
                  <TableCell align="center" className={styles.cell}>
                    {currencyFormat(row.price)}
                  </TableCell>
                  <TableCell align="center" className={styles.cell}>
                    {// eslint-disable-next-line
                      row.date ? moment.unix(row.date._seconds).format('DD-MM-YYYY') : moment().format('DD-MM-YYYY') 
                    }
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          )}
        </Table>
      </Paper>
      {!loading && (
        <ReactPaginate
          previousLabel={t('Marketplace:previous')}
          nextLabel={t('Marketplace:next')}
          breakLabel="..."
          breakClassName={styles.break}
          pageCount={totalPages}
          marginPagesDisplayed={1}
          pageRangeDisplayed={2}
          onPageChange={onChangePage}
          containerClassName={styles.pagination}
          pageClassName={styles.pages}
          previousClassName={styles.nextPage}
          nextClassName={styles.nextPage}
          activeClassName={styles.active}
          nextLinkClassName={styles.link}
          previousLinkClassName={styles.link}
          pageLinkClassName={styles.link}
          breakLinkClassName={styles.link}
          activeLinkClassName={styles.activeLink}
          initialPage={page}
          disableInitialCallback
        />
      )}
      {!!loading && (
        <div className={styles.loader}>
          <Loader />
        </div>
      )}
    </div>
  );
}

MarketPlace.propTypes = {
  buyers: PropTypes.arrayOf(),
  handleOpenBuyModal: PropTypes.func,
  handleOpenSellModal: PropTypes.func,
  loading: PropTypes.bool,
  page: PropTypes.number,
  sellers: PropTypes.arrayOf(),
  totalPages: PropTypes.number,
  onChangePage: PropTypes.func,
  onHandleBuyers: PropTypes.func,
  onHandleSellers: PropTypes.func
};

export default MarketPlace;
