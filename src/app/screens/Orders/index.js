import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { actionCreators as modalActions } from '../../../redux/Modal/actions';
import { actionCreators as ordersActions } from '../../../redux/Order/actions';
import Dashboard from '../../components/Dashboard';

import Orders from './layout';

class OrdersContainer extends Component {
  componentDidMount() {
    const { hydratePurchases, amount, page, sells, hydrateSells } = this.props;
    const params = { amount, page };
    if (sells.length) {
      hydrateSells(params);
    } else {
      hydratePurchases(params);
    }
  }

  handlePurchases = () => {
    const { hydratePurchases, amount, updatePage, purchases } = this.props;
    const params = { amount, page: 0 };
    if (purchases) {
      updatePage(0);
      hydratePurchases(params);
    }
  };

  handleSells = () => {
    const { hydrateSells, amount, updatePage, sells } = this.props;
    const params = { amount, page: 0 };
    if (sells) {
      updatePage(0);
      hydrateSells(params);
    }
  };

  handleChangePage = data => {
    const { hydrateSells, hydratePurchases, amount, sells, updatePage } = this.props;
    const params = { amount, page: data.selected };
    updatePage(data.selected);
    if (sells.length) {
      hydrateSells(params);
    } else {
      hydratePurchases(params);
    }
  };

  onOpenSellModal = () => {
    const { handleSellModalChange } = this.props;
    handleSellModalChange(true);
  };

  onOpenBuyModal = () => {
    const { handleBuyModalChange } = this.props;
    handleBuyModalChange(true);
  };

  render() {
    const { sells, purchases, loading, page, totalPages } = this.props;
    return (
      <Dashboard>
        <Orders
          purchases={purchases}
          sells={sells}
          loading={loading}
          onHandlePurchases={this.handlePurchases}
          onHandleSells={this.handleSells}
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

OrdersContainer.propTypes = {
  amount: PropTypes.number,
  handleBuyModalChange: PropTypes.func,
  handleSellModalChange: PropTypes.func,
  hydratePurchases: PropTypes.func,
  hydrateSells: PropTypes.func,
  loading: PropTypes.bool,
  page: PropTypes.number,
  purchases: PropTypes.arrayOf(),
  // eslint-disable-next-line
  sells: PropTypes.array,
  totalPages: PropTypes.number,
  updatePage: PropTypes.func
};

const mapStateToProps = store => ({
  purchases: store.order.purchases,
  sells: store.order.sells,
  loading: store.order.loading,
  amount: store.order.amount,
  page: store.order.page,
  totalPages: store.order.totalPages
});

const mapDispatchToProps = dispatch => ({
  hydrateSells: selectedOption => dispatch(ordersActions.hydrateSells(selectedOption)),
  hydratePurchases: selectedOption => dispatch(ordersActions.hydratePurchases(selectedOption)),
  updatePage: selectedPage => dispatch(ordersActions.updatePage(selectedPage)),
  handleSellModalChange: params => dispatch(modalActions.handleSellModalChange(params)),
  handleBuyModalChange: params => dispatch(modalActions.handleBuyModalChange(params))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OrdersContainer);
