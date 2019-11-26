import React from 'react';
import PropTypes from 'prop-types';
import { t } from 'i18next';

import InputLabel from '../../components/InputLabel';
import logo from '../../assets/logo_with_name.png';

import { FIELDS } from './constants';
import styles from './styles.module.scss';

function Login({ onEmailChange, onPasswordChange, onLogin, err }) {
  return (
    <form className={`column center full-width ${styles.formContainer}`} onSubmit={onLogin}>
      <div className="column center m-bottom-3">
        <img src={logo} alt="Logo" className={`${styles.logo}`} />
      </div>
      <div className={`column m-bottom-2 ${styles.sectionContainer}`}>
        <InputLabel
          label={t('Login:email')}
          name={FIELDS.email}
          inputId={FIELDS.email}
          dataFor={FIELDS.email}
          inputType="text"
          inputClassName={`m-bottom-2 full-width ${styles.input}`}
          textClassName={`${styles.label}`}
          placeholder={t('Login:emailPlaceholder')}
          handleChange={onEmailChange}
        />
        <InputLabel
          label={t('Login:password')}
          name={FIELDS.password}
          inputId={FIELDS.password}
          dataFor={FIELDS.password}
          inputType="password"
          inputClassName={`m-bottom-2 full-width ${styles.input}`}
          textClassName={`${styles.label}`}
          placeholder={t('Login:passwordPlaceholder')}
          handleChange={onPasswordChange}
        />
      </div>
      <div className={`column center ${styles.sectionContainer}`}>
        <button type="submit" className={`full-width m-bottom-1 ${styles.button}`}>
          {t('Login:enter')}
        </button>
      </div>
      {!!err && <span className={`column center ${styles.error}`}>{t('Login:error')}</span>}
    </form>
  );
}

Login.propTypes = {
  err: PropTypes.string.isRequired,
  onEmailChange: PropTypes.func.isRequired,
  onLogin: PropTypes.func.isRequired,
  onPasswordChange: PropTypes.func.isRequired
};

export default Login;
