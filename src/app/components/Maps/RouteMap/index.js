import React, { Component } from 'react';
import mapboxgl from 'mapbox-gl';

import { mainColor } from '../../../../constants/colors';

import styles from './styles.module.scss';

mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN;

class RouteMap extends Component {
  // state = {
  //   lng: -58.381624,
  //   lat: -34.603509,
  //   zoom: 12
  // };

  componentDidMount() {
    /* eslint-disable-next-line */
    const { routes } = this.props;
    const features = [];
    /* eslint-disable-next-line */
    routes.forEach((element,index) => {
      features.push({
        type: 'Feature',
        properties: {
          // red
          color: mainColor[index + 1]
        },
        geometry: {
          type: 'LineString',
          coordinates: element
        }
      });
    });
    const map = new mapboxgl.Map({
      container: this.mapContainer,
      // hosted style id
      style: 'mapbox://styles/mapbox/streets-v11',
      /* eslint-disable-next-line */
      center: [-122.48383155304096, 37.82882682974591],
      zoom: 16
    });

    map.on('load', () => {
      map.addLayer({
        id: 'lines',
        type: 'line',
        source: {
          type: 'geojson',
          data: {
            type: 'FeatureCollection',
            features
          }
        },
        paint: {
          'line-width': 3,
          // Use a get expression (https://docs.mapbox.com/mapbox-gl-js/style-spec/#expressions-get)
          // to set the line-color to a feature property value.
          'line-color': ['get', 'color']
        }
      });
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

export default RouteMap;
