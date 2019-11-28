import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { actionCreators as marketPlaceActions } from '../../../redux/MarketPlace/actions';
import Dashboard from '../../components/Dashboard';

import Statistics from './layout';

class StatisticsContainer extends Component {
  componentDidMount() {
    const { hydrateSellers, hydrateBuyers, amount, page } = this.props;
    const params = { amount, page };
    hydrateSellers(params);
    hydrateBuyers(params);
  }

  // handleChange = selectedOption => {
  //   const { updateFilter, hydrateStatistics, hydrateMap } = this.props;
  //   updateFilter(selectedOption);
  //   hydrateStatistics(selectedOption.value);
  //   hydrateMap(selectedOption);
  // };

  render() {
    const { heatCars, statistics, statisticsLoading, heatCarsLoading, filter } = this.props;
    return (
      <Dashboard>
        <Statistics
          statistics={statistics}
          mapInfo={heatCars}
          loading={statisticsLoading || heatCarsLoading}
          filter={filter}
          // onHandleChange={this.handleChange}
        />
      </Dashboard>
    );
  }
}

StatisticsContainer.propTypes = {
  amount: PropTypes.number,
  filter: PropTypes.string,
  heatCars: PropTypes.objectOf(),
  heatCarsLoading: PropTypes.bool,
  hydrateBuyers: PropTypes.func,
  hydrateSellers: PropTypes.func,
  page: PropTypes.number,
  statistics: PropTypes.objectOf(),
  statisticsLoading: PropTypes.bool
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
  hydrateBuyers: selectedOption => dispatch(marketPlaceActions.hydrateBuyers(selectedOption))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StatisticsContainer);
