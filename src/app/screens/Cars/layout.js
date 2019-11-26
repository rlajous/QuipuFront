import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { t } from 'i18next';
import PropTypes from 'prop-types';

import Loader from '../../components/Loader';

import classes from './styles.module.scss';

function Cars({ cars, loading }) {
  return (
    <div className={loading ? classes.loading : classes.root}>
      {loading && <Loader />}
      {!!cars && (
        <Paper className={classes.paper}>
          <Table size="medium">
            <TableHead className={classes.head}>
              <TableRow>
                <TableCell align="center" className={classes.cell}>
                  {t('Cars:id')}
                </TableCell>
                <TableCell align="center" className={classes.cell}>
                  {t('Cars:brand')}
                </TableCell>
                <TableCell align="center" className={classes.cell}>
                  {t('Cars:model')}
                </TableCell>
                <TableCell align="center" className={classes.cell}>
                  {t('Cars:year')}
                </TableCell>
                <TableCell align="center" className={classes.cell}>
                  {t('Cars:type')}
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {cars.map(row => (
                <TableRow className={classes.row} key={row.name}>
                  <TableCell component="th" scope="row" align="center" className={classes.cell}>
                    {row.id}
                  </TableCell>
                  <TableCell align="center" className={classes.cell}>
                    {row.brand}
                  </TableCell>
                  <TableCell align="center" className={classes.cell}>
                    {row.model}
                  </TableCell>
                  <TableCell align="center" className={classes.cell}>
                    {row.year}
                  </TableCell>
                  <TableCell align="center" className={classes.cell}>
                    {row.type}
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

Cars.propTypes = {
  // eslint-disable-next-line
  cars: PropTypes.array,
  loading: PropTypes.bool
};

export default Cars;
