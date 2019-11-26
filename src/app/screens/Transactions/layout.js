import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
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

function Transactions({ cars, loading }) {
  return (
    <div className={loading ? styles.loading : styles.root}>
      <div className={styles.header}>
        <h1 className={styles.title}>{t('Transactions:title')}</h1>
        <Select
          options={options}
          className={styles.container}
          defaultValue={options[0]}
          isDisabled={loading}
        />
      </div>
      {loading && <Loader />}
      {!!cars && (
        <Paper className={styles.paper}>
          <Table size="medium">
            <TableHead className={styles.head}>
              <TableRow>
                <TableCell align="center" className={styles.cell}>
                  {t('Transactions:tokens')}
                </TableCell>
                <TableCell align="center" className={styles.cell}>
                  {t('Transactions:price')}
                </TableCell>
                <TableCell align="center" className={styles.cell}>
                  {t('Transactions:date')}
                </TableCell>
                <TableCell align="center" className={styles.cell}>
                  {t('Transactions:type')}
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {cars.map(row => (
                <TableRow className={styles.row} key={row.name}>
                  <TableCell component="th" scope="row" align="center" className={styles.cell}>
                    {row.id}
                  </TableCell>
                  <TableCell align="center" className={styles.cell}>
                    {row.brand}
                  </TableCell>
                  <TableCell align="center" className={styles.cell}>
                    {row.model}
                  </TableCell>
                  <TableCell align="center" className={styles.cell}>
                    {row.year}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>
      )}
    </div>
  );
}

Transactions.propTypes = {
  // eslint-disable-next-line
  cars: PropTypes.array,
  loading: PropTypes.bool
};

export default Transactions;
