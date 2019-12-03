import React from 'react';
import PropTypes from 'prop-types';

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
  value,
  validate,
  meta,
  input,
  autoFocus
}) {
  const { touched, error, warning,  active } = meta;
  console.log({ touched, error, warning });
  return (
    <div className={`column start ${className} `}>
      <label className={`m-bottom-1 ${textClassName}`} htmlFor={dataFor}>
        {label}
      </label>
      <input
        {...input}
        className={`${inputClassName}  ${error && touched && !active ? styles.inputError : ''}`}
        name={name}
        placeholder={placeholder}
        id={inputId}
        type={inputType}
        onChange={handleChange}
        disabled={disabled}
        value={value}
        validate={validate}
        autoFocus={autoFocus}
      />
      {meta.error && meta.touched && !meta.active && <div className={styles.error}>{meta.error}</div>}
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
