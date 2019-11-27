import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { actionCreators as transactionsActions } from '../../../redux/Transactions/actions';
import Dashboard from '../../components/Dashboard';

import Transactions from './layout';

class TransactionsContainer extends Component {
  componentDidMount() {
    const { hydrateTransactions } = this.props;
    hydrateTransactions();
  }

  render() {
    const { transactions, loading, user } = this.props;
    return (
      <Dashboard>
        <Transactions transactions={transactions} loading={loading} user={user} />
      </Dashboard>
    );
  }
}

TransactionsContainer.propTypes = {
  hydrateTransactions: PropTypes.func,
  loading: PropTypes.bool,
  // eslint-disable-next-line
  user:PropTypes.object,
  // eslint-disable-next-line
  transactions: PropTypes.array
};

const mapStateToProps = store => ({
  transactions: store.transactions.transactions,
  user: store.auth.user,
  loading: store.transactions.loading
});

const mapDispatchToProps = dispatch => ({
  hydrateTransactions: () => dispatch(transactionsActions.hydrateTransactions())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TransactionsContainer);
