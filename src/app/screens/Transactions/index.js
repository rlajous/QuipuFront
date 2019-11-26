import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { actionCreators as carActions } from '../../../redux/Cars/actions';
import Dashboard from '../../components/Dashboard';

import Transactions from './layout';

class TransactionsContainer extends Component {
  componentDidMount() {
    const { hydrateCars } = this.props;
    hydrateCars();
  }

  render() {
    const { cars, loading } = this.props;
    return (
      <Dashboard>
        <Transactions cars={cars} loading={loading} />
      </Dashboard>
    );
  }
}

TransactionsContainer.propTypes = {
  hydrateCars: PropTypes.func,
  // eslint-disable-next-line
  cars: PropTypes.array,
  loading: PropTypes.bool
};

const mapStateToProps = store => ({
  cars: store.cars.cars,
  loading: store.cars.loading
});

const mapDispatchToProps = dispatch => ({
  hydrateCars: () => dispatch(carActions.hydrateCars())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TransactionsContainer);