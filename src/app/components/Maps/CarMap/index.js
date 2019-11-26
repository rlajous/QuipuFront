import React, { Component } from 'react';
import mapboxgl from 'mapbox-gl';
import PropTypes from 'prop-types';

import styles from './styles.module.scss';
import { TEN, PITCH } from './constants';

mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN;

class CarMap extends Component {
  state = {
    lng: -58.381624,
    lat: -34.603509,
    zoom: 12
  };

  componentDidMount() {
    const { cars } = this.props;
    const map = new mapboxgl.Map({
      container: this.mapContainer,
      // hosted style id
      style: 'mapbox://styles/mapbox/streets-v9',
      // starting position
      center: [this.state.lng, this.state.lat],
      // starting zoom
      zoom: this.state.zoom
    });

    map.on('load', () => {
      // We use D3 to fetch the JSON here so that we can parse and use it separately
      // from GL JS's use in the added source. You can use any request method (library
      // or otherwise) that you want.

      // save full coordinate list for later
      const data = JSON.parse(JSON.stringify(cars));
      const { coordinates } = data.features[0].geometry;

      // start by showing just the first coordinate
      data.features[0].geometry.coordinates = [coordinates[0]];

      // add it to the map
      map.addSource('trace', { type: 'geojson', data });
      map.addLayer({
        id: 'trace',
        type: 'line',
        source: 'trace',
        paint: {
          'line-color': 'yellow',
          'line-opacity': 0.75,
          'line-width': 5
        }
      });

      // setup the viewport
      map.jumpTo({ center: coordinates[0], zoom: 14 });
      map.setPitch(PITCH);

      // on a regular basis, add more coordinates from the saved list and update the map
      let i = 0;
      const timer = window.setInterval(() => {
        if (i < coordinates.length) {
          data.features[0].geometry.coordinates.push(coordinates[i]);
          map.getSource('trace').setData(data);
          map.panTo(coordinates[i]);
          i++;
        } else {
          window.clearInterval(timer);
        }
      }, TEN);
      // });
    });
  }

  render() {
    return (
      <div className={styles.container}>
        {/* eslint-disable-next-line*/}
        <div ref={el => (this.mapContainer = el)} className={styles.section_container} />
      </div>
    );
  }
}

CarMap.propTypes = {
  cars: PropTypes.objectOf()
};

export default CarMap;
