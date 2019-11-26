import React, { Component } from 'react';
import mapboxgl from 'mapbox-gl';

import styles from './styles.module.scss';

mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN;

class HeatMap extends Component {
  // state = {
  //   lng: -58.381624,
  //   lat: -34.603509,
  //   zoom: 12
  // };

  componentDidMount() {
    /* eslint-disable-next-line */
    const { data } = this.props;
    const map = new mapboxgl.Map({
      container: this.mapContainer,
      // hosted style id
      style: 'mapbox://styles/mapbox/dark-v10',
      /* eslint-disable-next-line */
      center: [-120, 50],
      // starting zoom
      zoom: 2
    });

    map.on('load', () => {
      // Add a geojson point source.
      // Heatmap layers also work with a vector tile source.
      map.addSource('earthquakes', {
        type: 'geojson',
        data
      });

      map.addLayer(
        {
          id: 'earthquakes-heat',
          type: 'heatmap',
          source: 'earthquakes',
          maxzoom: 9,
          paint: {
            // Increase the heatmap weight based on frequency and property magnitude
            /* eslint-disable-next-line */
            'heatmap-weight': ['interpolate', ['linear'], ['get', 'mag'], 0, 0, 6, 1],

            // Increase the heatmap color weight weight by zoom level
            // heatmap-intensity is a multiplier on top of heatmap-weight
            /* eslint-disable-next-line */
            'heatmap-intensity': ['interpolate', ['linear'], ['zoom'], 0, 1, 9, 3],

            // Color ramp for heatmap.  Domain is 0 (low) to 1 (high).
            // Begin color ramp at 0-stop with a 0-transparancy color
            // to create a blur-like effect.
            'heatmap-color': [
              'interpolate',
              ['linear'],
              ['heatmap-density'],
              0,
              'rgba(33,102,172,0)',
              /* eslint-disable-next-line */
              0.2,
              'rgb(103,169,207)',
              /* eslint-disable-next-line */
              0.4,
              'rgb(209,229,240)',
              /* eslint-disable-next-line */
              0.6,
              'rgb(253,219,199)',
              /* eslint-disable-next-line */
              0.8,
              'rgb(239,138,98)',
              1,
              'rgb(178,24,43)'
            ],
            // Adjust the heatmap radius by zoom level
            /* eslint-disable-next-line */
            'heatmap-radius': ['interpolate', ['linear'], ['zoom'], 0, 2, 9, 20],

            // Transition from heatmap to circle layer by zoom level
            /* eslint-disable-next-line */
            'heatmap-opacity': ['interpolate', ['linear'], ['zoom'], 7, 1, 9, 0]
          }
        },
        'waterway-label'
      );
      map.addLayer(
        {
          id: 'earthquakes-point',
          type: 'circle',
          source: 'earthquakes',
          minzoom: 7,
          paint: {
            // Size circle radius by earthquake magnitude and zoom level
            'circle-radius': [
              'interpolate',
              ['linear'],
              ['zoom'],
              /* eslint-disable-next-line */
              7,
              /* eslint-disable-next-line */
              ['interpolate', ['linear'], ['get', 'mag'], 1, 1, 6, 4],
              /* eslint-disable-next-line */
              16,
              /* eslint-disable-next-line */
              ['interpolate', ['linear'], ['get', 'mag'], 1, 5, 6, 50]
            ],
            // Color circle by earthquake magnitude
            'circle-color': [
              'interpolate',
              ['linear'],
              ['get', 'mag'],
              1,
              'rgba(33,102,172,0)',
              2,
              'rgb(103,169,207)',
              /* eslint-disable-next-line */
              3,
              'rgb(209,229,240)',
              /* eslint-disable-next-line */
              4,
              'rgb(253,219,199)',
              /* eslint-disable-next-line */
              5,
              'rgb(239,138,98)',
              /* eslint-disable-next-line */
              6,
              'rgb(178,24,43)'
            ],
            'circle-stroke-color': 'white',
            'circle-stroke-width': 1,
            // Transition from heatmap to circle layer by zoom level
            /* eslint-disable-next-line */
            'circle-opacity': ['interpolate', ['linear'], ['zoom'], 7, 0, 8, 1]
          }
        },
        'waterway-label'
      );
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

export default HeatMap;
