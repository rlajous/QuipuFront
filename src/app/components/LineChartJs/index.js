import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { mainColor, secondaryColor } from '../../../constants/colors';

import './styles.scss';

class LineChart extends Component {
  constructor(props) {
    super(props);
    this.chartRef = React.createRef();
  }

  componentDidUpdate() {
    this.myChart.update();
  }

  componentDidMount() {
    /* eslint-disable-next-line */
    const { data } = this.props;
    const datasets = [];
    /* eslint-disable-next-line */
    data.cars.forEach((element) => {
      element.data.forEach((km, index) => {
        if (datasets[index] === undefined) {
          datasets.push(km);
        } else {
          datasets[index] += km;
        }
      });
    });
    /* eslint-disable-next-line */
    this.myChart = new Chart(this.chartRef.current, { 
      type: 'line',
      options: { responsive: true },
      data: {
        /* eslint-disable-next-line */
        labels: data.labels,
        datasets: [
          {
            label: 'Total',
            /* eslint-disable-next-line */
            data: datasets,
            /* eslint-disable-next-line */
            fill: 'origin',
            /* eslint-disable-next-line */
            backgroundColor: secondaryColor[0],
            pointRadius: 2,
            /* eslint-disable-next-line */
            borderColor: mainColor[0],
            borderWidth: 1,
            lineTension: 0.4
            // backgroundColor: `#${(0x1000000 + Math.random() * 0xffffff).toString(16).substr(1, 6)}`
          }
        ]
      }
    });
  }

  render() {
    const { title } = this.props;
    return (
      <div className="chart">
        <span className="title">{title}</span>
        <canvas className="element" ref={this.chartRef} />
      </div>
    );
  }
}

LineChart.propTypes = {
  // dataSets: PropTypes.arrayOf(),
  title: PropTypes.string
};

LineChart.defaultProps = {
  // dataSets: []
};

export default LineChart;
