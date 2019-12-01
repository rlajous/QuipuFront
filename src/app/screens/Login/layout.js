import React from 'react';
import PropTypes from 'prop-types';
import { t } from 'i18next';
import { NavLink } from 'react-router-dom';

import Routes from '../../../constants/routes';
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
      <span className={`column center ${styles.title}`}>{t('Login:login')}</span>
      <div className={`column m-bottom-2 ${styles.sectionContainer}`}>
        <InputLabel
          label={t('Login:email')}
          name={FIELDS.email}
          inputId={FIELDS.email}
          dataFor={FIELDS.email}
          inputType="email"
          inputClassName={styles.input}
          textClassName={styles.inputText}
          placeholder={t('Login:emailPlaceholder')}
          handleChange={onEmailChange}
        />
        <InputLabel
          label={t('Login:password')}
          name={FIELDS.password}
          inputId={FIELDS.password}
          dataFor={FIELDS.password}
          inputType="password"
          inputClassName={styles.input}
          textClassName={styles.inputText}
          placeholder={t('Login:passwordPlaceholder')}
          handleChange={onPasswordChange}
        />
      </div>
      <div className={`row center ${styles.sectionContainer}`}>
        <button type="submit" className={`${styles.button}`}>
          {t('Login:enter')}
        </button>
        <NavLink to={Routes.Register} activeClassName={styles.bold}>
          <span className={styles.button}>{t('SignUp:register')}</span>
        </NavLink>
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
