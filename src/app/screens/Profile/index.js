import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { actionCreators as campaignActions } from '../../../redux/Campaign/actions';
import { actionCreators as mapActions } from '../../../redux/Routes/actions';
import Dashboard from '../../components/Dashboard';

import Home from './layout';

class HomeContainer extends Component {
  componentDidMount() {
    const { hydrateMap, hydrateStatistics } = this.props;
    hydrateStatistics();
    hydrateMap();
  }

  render() {
    const { carsMap, campaign, campaignLoading, carsMapLoading } = this.props;
    return (
      <Dashboard>
        <Home campaign={campaign} mapInfo={carsMap} loading={campaignLoading || carsMapLoading} />
      </Dashboard>
    );
  }
}

HomeContainer.propTypes = {
  campaign: PropTypes.objectOf(),
  campaignLoading: PropTypes.bool,
  carsMap: PropTypes.objectOf(),
  carsMapLoading: PropTypes.bool,
  hydrateMap: PropTypes.func,
  hydrateStatistics: PropTypes.func
};

const mapStateToProps = store => ({
  campaign: store.campaign.campaign,
  carsMap: store.routes.liveCars,
  campaignLoading: store.campaign.loading,
  carsMapLoading: store.routes.loading
});

const mapDispatchToProps = dispatch => ({
  hydrateMap: () => dispatch(mapActions.hydrateMovingCars()),
  hydrateStatistics: () => dispatch(campaignActions.hydrateCampaign())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomeContainer);
