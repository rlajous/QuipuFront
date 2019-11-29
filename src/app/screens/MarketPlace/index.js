import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { actionCreators as marketPlaceActions } from '../../../redux/MarketPlace/actions';
import Dashboard from '../../components/Dashboard';

import MarketPlace from './layout';

class MarketPlaceContainer extends Component {
  componentDidMount() {
    const { hydrateBuyers, amount, page, sellers, hydrateSellers } = this.props;
    const params = { amount, page };
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
        />
      </Dashboard>
    );
  }
}

MarketPlaceContainer.propTypes = {
  amount: PropTypes.number,
  buyers: PropTypes.arrayOf(),
  filter: PropTypes.string,
  hydrateBuyers: PropTypes.func,
  hydrateSellers: PropTypes.func,
  loading: PropTypes.bool,
  // eslint-disable-next-line
  page: PropTypes.number,
  // eslint-disable-next-line
  sellers: PropTypes.array,
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
  updatePage: selectedPage => dispatch(marketPlaceActions.updatePage(selectedPage))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MarketPlaceContainer);
