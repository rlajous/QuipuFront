import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { actionCreators as mapActions } from '../../../redux/Routes/actions';
import { actionCreators as statisticsActions } from '../../../redux/Statistics/actions';
import Dashboard from '../../components/Dashboard';

import Statistics from './layout';

class StatisticsContainer extends Component {
  componentDidMount() {
    const { hydrateMap, hydrateStatistics, filter } = this.props;
    hydrateStatistics(filter);
    hydrateMap(filter);
  }

  handleChange = selectedOption => {
    const { updateFilter, hydrateStatistics, hydrateMap } = this.props;
    updateFilter(selectedOption);
    hydrateStatistics(selectedOption.value);
    hydrateMap(selectedOption);
  };

  render() {
    const { heatCars, statistics, statisticsLoading, heatCarsLoading, filter } = this.props;
    return (
      <Dashboard>
        <Statistics
          statistics={statistics}
          mapInfo={heatCars}
          loading={statisticsLoading || heatCarsLoading}
          filter={filter}
          onHandleChange={this.handleChange}
        />
      </Dashboard>
    );
  }
}

StatisticsContainer.propTypes = {
  filter: PropTypes.string,
  heatCars: PropTypes.objectOf(),
  heatCarsLoading: PropTypes.bool,
  hydrateMap: PropTypes.func,
  hydrateStatistics: PropTypes.func,
  statistics: PropTypes.objectOf(),
  statisticsLoading: PropTypes.bool,
  updateFilter: PropTypes.func
};

const mapStateToProps = store => ({
  statistics: store.statistics.statistics,
  heatCars: store.routes.heatCars,
  statisticsLoading: store.statistics.loading,
  heatCarsLoading: store.routes.loading,
  filter: store.statistics.filter
});

const mapDispatchToProps = dispatch => ({
  hydrateMap: selectedOption => dispatch(mapActions.hydrateHeatmapCars(selectedOption)),
  hydrateStatistics: selectedOption => dispatch(statisticsActions.hydrateStatistics(selectedOption)),
  updateFilter: selectedOption => dispatch(statisticsActions.updateFilter(selectedOption))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StatisticsContainer);
