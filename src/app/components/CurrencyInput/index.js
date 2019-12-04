import React from 'react';
import PropTypes from 'prop-types';
import CurrencyInput from 'react-currency-input';

import styles from './styles.module.scss';

function InputLabel({
  className,
  textClassName,
  dataFor,
  label,
  inputClassName,
  name,
  placeholder,
  inputId,
  inputType,
  handleChange,
  disabled,
  validate,
  // eslint-disable-next-line
  meta,
  // eslint-disable-next-line
  input,
  // eslint-disable-next-line
  autoFocus
}) {
  // eslint-disable-next-line
  const { touched, error, active } = meta;
  return (
    <div className="column">
      <div className={`start ${className} `}>
        <label className={`m-bottom-1 ${textClassName}`} htmlFor={dataFor}>
          {label}
        </label>
        <CurrencyInput
          prefix="$"
          decimalSeparator="."
          thousandSeparator=""
          precision="2"
          className={`${inputClassName}  ${error && touched && !active ? styles.inputError : ''}`}
          name={name}
          placeholder={placeholder}
          id={inputId}
          type={inputType}
          onChange={handleChange}
          disabled={disabled}
          validate={validate}
          autoFocus={autoFocus}
          {...input}
        />
      </div>
      {// eslint-disable-next-line
        meta.error && meta.touched && !meta.active && <div className={styles.error}>{meta.error}</div>
      }
    </div>
  );
}

InputLabel.propTypes = {
  dataFor: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
  inputId: PropTypes.string.isRequired,
  inputType: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  inputClassName: PropTypes.string,
  placeholder: PropTypes.string,
  textClassName: PropTypes.string,
  validate: PropTypes.arrayOf,
  value: PropTypes.string
};

InputLabel.defaultProps = {
  className: '',
  inputClassName: '',
  placeholder: '',
  textClassName: ''
};

export default InputLabel;
