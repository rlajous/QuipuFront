import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { mainColor } from '../../../constants/colors';

import './styles.scss';

class PieChart extends Component {
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
    const labels = [];
    /* eslint-disable-next-line */
    data.cars.forEach(car => {
      const { label } = car;
      labels.push(label);
      let total = 0;
      car.data.forEach(element => {
        total += element;
      });
      datasets.push(total);
    });
    const backgroundColor = JSON.parse(JSON.stringify(mainColor));
    backgroundColor.shift();
    /* eslint-disable-next-line */
    this.myChart = new Chart(this.chartRef.current, {
      type: 'doughnut',
      data: {
        labels,
        datasets: [
          {
            /* eslint-disable-next-line */
            data: datasets,
            /* eslint-disable-next-line */
            backgroundColor
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

PieChart.propTypes = {
  // dataSets: PropTypes.arrayOf(),
  title: PropTypes.string
};

PieChart.defaultProps = {
  // dataSets: []
};

export default PieChart;
