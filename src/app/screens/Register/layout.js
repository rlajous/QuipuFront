import React from 'react';
import PropTypes from 'prop-types';
import { t } from 'i18next';

import InputLabel from '../../components/InputLabel';
import logo from '../../assets/logo_with_name.png';

import { FIELDS } from './constants';
import styles from './styles.module.scss';

function SignUp({ onEmailChange, onPasswordChange, onSignUp, err, onConfirmPasswordChange }) {
  return (
    <form className={`column center full-width ${styles.formContainer}`} onSubmit={onSignUp}>
      <div className="column center m-bottom-3">
        <img src={logo} alt="Logo" className={`${styles.logo}`} />
      </div>
      <div className={`column m-bottom-2 ${styles.sectionContainer}`}>
        <InputLabel
          label={t('SignUp:email')}
          name={FIELDS.email}
          inputId={FIELDS.email}
          dataFor={FIELDS.email}
          inputType="text"
          inputClassName={`m-bottom-2 full-width ${styles.input}`}
          textClassName={`${styles.label}`}
          placeholder={t('SignUp:emailPlaceholder')}
          handleChange={onEmailChange}
        />
        <InputLabel
          label={t('SignUp:password')}
          name={FIELDS.password}
          inputId={FIELDS.password}
          dataFor={FIELDS.password}
          inputType="password"
          inputClassName={`m-bottom-2 full-width ${styles.input}`}
          textClassName={`${styles.label}`}
          placeholder={t('SignUp:passwordPlaceholder')}
          handleChange={onPasswordChange}
        />
        <InputLabel
          label={t('SignUp:confirmPassword')}
          name={FIELDS.confirmPassword}
          inputId={FIELDS.confirmPassword}
          dataFor={FIELDS.confirmPassword}
          inputType="password"
          inputClassName={`m-bottom-2 full-width ${styles.input}`}
          textClassName={`${styles.label}`}
          placeholder={t('SignUp:confirmPasswordPlaceholder')}
          handleChange={onConfirmPasswordChange}
        />
      </div>
      <div className={`column center ${styles.sectionContainer}`}>
        <button type="submit" className={`full-width m-bottom-1 ${styles.button}`}>
          {t('SignUp:enter')}
        </button>
      </div>
      {!!err && <span className={`column center ${styles.error}`}>{t('SignUp:error')}</span>}
    </form>
  );
}

SignUp.propTypes = {
  err: PropTypes.string.isRequired,
  onConfirmPasswordChange: PropTypes.func.isRequired,
  onEmailChange: PropTypes.func.isRequired,
  onPasswordChange: PropTypes.func.isRequired,
  onSignUp: PropTypes.func.isRequired
};

export default SignUp;
