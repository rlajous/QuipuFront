import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Dashboard from '../../components/Dashboard';
import { actionCreators as modalActions } from '../../../redux/Modal/actions';
import { actionCreators as transactionsActions } from '../../../redux/Transactions/actions';
import { propTypes as transactionsProptypes } from '../../../redux/Transactions/reducer';
import { propTypes as userProptypes } from '../../../redux/Auth/reducer';

import Wallet from './layout';

class WalletContainer extends Component {
  componentDidMount() {
    const { hydrateTransactions, amount, page, handleBuyModalChange, handleSellModalChange } = this.props;
    handleBuyModalChange(false);
    handleSellModalChange(false);
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
        <Wallet
          transactions={transactions}
          loading={loading}
          user={user}
          page={page}
          totalPages={totalPages}
          onChangePage={this.handleChangePage}
          handleOpenSellModal={this.onOpenSellModal}
          handleOpenBuyModal={this.onOpenBuyModal}
        />
      </Dashboard>
    );
  }
}

WalletContainer.propTypes = {
  amount: PropTypes.number,
  handleBuyModalChange: PropTypes.func,
  handleSellModalChange: PropTypes.func,
  hydrateTransactions: PropTypes.func,
  loading: PropTypes.bool,
  page: PropTypes.number,
  totalPages: PropTypes.number,
  transactions: transactionsProptypes.transactions,
  updatePage: PropTypes.func,
  user: userProptypes.user
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

export default connect(mapStateToProps, mapDispatchToProps)(WalletContainer);
