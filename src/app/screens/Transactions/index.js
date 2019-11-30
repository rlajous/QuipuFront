import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { actionCreators as modalActions } from '../../../redux/Modal/actions';
import { actionCreators as transactionsActions } from '../../../redux/Transactions/actions';
import Dashboard from '../../components/Dashboard';

import Transactions from './layout';

class TransactionsContainer extends Component {
  componentDidMount() {
    const { hydrateTransactions, amount, page } = this.props;
    const params = { amount, page };
    hydrateTransactions(params);
  }

  onOpenSellModal = () => {
    const { handleSellModalChange } = this.props;
    handleSellModalChange(true);
  };

  onOpenBuyModal = () => {
    const { handleBuyModalChange } = this.props;
    handleBuyModalChange(true);
  };

  handleChangePage = data => {
    const { hydrateTransactions, amount, updatePage } = this.props;
    const params = { amount, page: data.selected };
    updatePage(data.selected);
    hydrateTransactions(params);
  };

  render() {
    const { transactions, loading, user, page, totalPages } = this.props;
    return (
      <Dashboard>
        <Transactions
          transactions={transactions}
          loading={loading}
          user={user}
          page={page}
          totalPages={totalPages}
          handleOpenSellModal={this.onOpenSellModal}
          handleOpenBuyModal={this.onOpenBuyModal}
        />
      </Dashboard>
    );
  }
}

TransactionsContainer.propTypes = {
  amount: PropTypes.number,
  handleBuyModalChange: PropTypes.func,
  handleSellModalChange: PropTypes.func,
  hydrateTransactions: PropTypes.func,
  loading: PropTypes.bool,
  page: PropTypes.number,
  totalPages: PropTypes.number,
  // eslint-disable-next-line
  transactions: PropTypes.array,
  updatePage: PropTypes.func,
  // eslint-disable-next-line
  user: PropTypes.object
};

const mapStateToProps = store => ({
  transactions: store.transactions.transactions,
  user: store.auth.user,
  loading: store.transactions.loading,
  amount: store.transactions.amount,
  page: store.transactions.page,
  totalPages: store.transactions.totalPages
});

const mapDispatchToProps = dispatch => ({
  hydrateTransactions: selectedOption => dispatch(transactionsActions.hydrateTransactions(selectedOption)),
  handleSellModalChange: params => dispatch(modalActions.handleSellModalChange(params)),
  handleBuyModalChange: params => dispatch(modalActions.handleBuyModalChange(params)),
  updatePage: selectedPage => dispatch(transactionsActions.updatePage(selectedPage))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TransactionsContainer);
