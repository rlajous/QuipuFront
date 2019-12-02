import React from 'react';
import PropTypes from 'prop-types';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { t } from 'i18next';
import ReactPaginate from 'react-paginate';
import moment from 'moment';

import { currencyFormat } from '../../../../../utils/parsers';

import styles from './styles.module.scss';

function Orders({ loading, transactions, user, totalPages, onChangePage, page }) {
  return (
    <>
      <Paper className={styles.paper}>
        <Table size="medium">
          <TableHead className={styles.head}>
            <TableRow>
              <TableCell align="center" className={styles.cell}>
                {t('Orders:type')}
              </TableCell>
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
          {!!transactions && (
            <TableBody>
              {transactions.map(row => (
                <TableRow className={styles.row} key={row.name}>
                  <TableCell component="th" scope="row" align="center" className={styles.cell}>
                    {row.sellerId === user.uid ? t('Orders:sells') : t('Orders:purchases')}
                  </TableCell>
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
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
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
    </>
  );
}

Orders.propTypes = {
  loading: PropTypes.bool,
  page: PropTypes.number,
  totalPages: PropTypes.number,
  transactions: PropTypes.arrayOf,
  user: PropTypes.objectOf,
  onChangePage: PropTypes.func
};

export default Orders;
