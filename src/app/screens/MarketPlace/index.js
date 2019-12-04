import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { actionCreators as modalActions } from '../../../redux/Modal/actions';
import { actionCreators as marketPlaceActions } from '../../../redux/MarketPlace/actions';
import Dashboard from '../../components/Dashboard';
import { propTypes as orderProptypes } from '../../../redux/Order/reducer';

import MarketPlace from './layout';

class MarketPlaceContainer extends Component {
  componentDidMount() {
    const {
      hydrateBuyers,
      amount,
      page,
      sellers,
      hydrateSellers,
      handleBuyModalChange,
      handleSellModalChange
    } = this.props;
    const params = { amount, page };
    handleBuyModalChange(false);
    handleSellModalChange(false);
    if (sellers.length) {
      hydrateSellers(params);
    } else {
      hydrateBuyers(params);
    }
  }

  handleBuyers = () => {
    const { hydrateBuyers, amount, updatePage, sellers } = this.props;
    const params = { amount, page: 0 };
    if (sellers) {
      updatePage(0);
      hydrateBuyers(params);
    }
  };

  handleSellers = () => {
    const { hydrateSellers, amount, updatePage, buyers } = this.props;
    const params = { amount, page: 0 };
    if (buyers) {
      updatePage(0);
      hydrateSellers(params);
    }
  };

  handleChangePage = data => {
    const { hydrateSellers, hydrateBuyers, amount, sellers, updatePage } = this.props;
    const params = { amount, page: data.selected };
    updatePage(data.selected);
    if (sellers.length) {
      hydrateSellers(params);
    } else {
      hydrateBuyers(params);
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
    const { sellers, buyers, loading, filter, page, totalPages } = this.props;
    return (
      <Dashboard>
        <MarketPlace
          buyers={buyers}
          sellers={sellers}
          loading={loading}
          filter={filter}
          onHandleBuyers={this.handleBuyers}
          onHandleSellers={this.handleSellers}
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

MarketPlaceContainer.propTypes = {
  amount: PropTypes.number,
  buyers: orderProptypes.orders,
  filter: PropTypes.string,
  handleBuyModalChange: PropTypes.func,
  handleSellModalChange: PropTypes.func,
  hydrateBuyers: PropTypes.func,
  hydrateSellers: PropTypes.func,
  loading: PropTypes.bool,
  page: PropTypes.number,
  sellers: orderProptypes.orders,
  totalPages: PropTypes.number,
  updatePage: PropTypes.func
};

const mapStateToProps = store => ({
  buyers: store.marketPlace.buyers,
  sellers: store.marketPlace.sellers,
  loading: store.marketPlace.loading,
  amount: store.marketPlace.amount,
  page: store.marketPlace.page,
  totalPages: store.marketPlace.totalPages
});

const mapDispatchToProps = dispatch => ({
  hydrateSellers: selectedOption => dispatch(marketPlaceActions.hydrateSellers(selectedOption)),
  hydrateBuyers: selectedOption => dispatch(marketPlaceActions.hydrateBuyers(selectedOption)),
  updatePage: selectedPage => dispatch(marketPlaceActions.updatePage(selectedPage)),
  handleSellModalChange: params => dispatch(modalActions.handleSellModalChange(params)),
  handleBuyModalChange: params => dispatch(modalActions.handleBuyModalChange(params))
});

export default connect(mapStateToProps, mapDispatchToProps)(MarketPlaceContainer);
