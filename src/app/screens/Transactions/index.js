import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { actionCreators as modalActions } from '../../../redux/Modal/actions';
import { actionCreators as transactionsActions } from '../../../redux/Transactions/actions';
import Dashboard from '../../components/Dashboard';

import Transactions from './layout';

class TransactionsContainer extends Component {
  componentDidMount() {
    const { hydrateTransactions } = this.props;
    hydrateTransactions();
  }

  onOpenSellModal = () => {
    const { handleSellModalChange } = this.props;
    handleSellModalChange(true);
  };

  onOpenBuyModal = () => {
    const { handleBuyModalChange } = this.props;
    handleBuyModalChange(true);
  };

  render() {
    const { transactions, loading, user } = this.props;
    return (
      <Dashboard>
        <Transactions
          transactions={transactions}
          loading={loading}
          user={user}
          handleOpenSellModal={this.onOpenSellModal}
          handleOpenBuyModal={this.onOpenBuyModal}
        />
      </Dashboard>
    );
  }
}

TransactionsContainer.propTypes = {
  handleBuyModalChange: PropTypes.func,
  handleSellModalChange: PropTypes.func,
  hydrateTransactions: PropTypes.func,
  loading: PropTypes.bool,
  // eslint-disable-next-line
  transactions: PropTypes.array,
  // eslint-disable-next-line
  user: PropTypes.object
};

const mapStateToProps = store => ({
  transactions: store.transactions.transactions,
  user: store.auth.user,
  loading: store.transactions.loading
});

const mapDispatchToProps = dispatch => ({
  hydrateTransactions: () => dispatch(transactionsActions.hydrateTransactions()),
  handleSellModalChange: params => dispatch(modalActions.handleSellModalChange(params)),
  handleBuyModalChange: params => dispatch(modalActions.handleBuyModalChange(params))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TransactionsContainer);
