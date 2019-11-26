import React from 'react';
import PropTypes from 'prop-types';

import Loading from '../Loader';

export function withSpinner({ WrappedComponent, classNameContainer }) {
  function Spinner({ loading, ...props }) {
    return loading ? (
      <div className={classNameContainer}>
        <Loading />
      </div>
    ) : (
      <WrappedComponent {...props} />
    );
  }

  Spinner.propTypes = {
    loading: PropTypes.bool,
    props: PropTypes.object // eslint-disable-line react/forbid-prop-types
  };

  return Spinner;
}

withSpinner.propTypes = {
  classNameContainer: PropTypes.string,
  WrappedComponent: PropTypes.node
};

withSpinner.defaultProps = {
  classNameContainer: ''
};
