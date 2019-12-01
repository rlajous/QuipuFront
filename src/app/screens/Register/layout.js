import React from 'react';
import PropTypes from 'prop-types';
import { t } from 'i18next';
import { NavLink } from 'react-router-dom';

import Routes from '../../../constants/routes';
import InputLabel from '../../components/InputLabel';
import logo from '../../assets/logo_with_name.png';

import { FIELDS } from './constants';
import styles from './styles.module.scss';

function SignUp({ onEmailChange, onPasswordChange, onSignUp, err }) {
  return (
    <form className={`column center full-width ${styles.formContainer}`} onSubmit={onSignUp}>
      <div className="column center m-bottom-3">
        <img src={logo} alt="Logo" className={`${styles.logo}`} />
      </div>
      <span className={`column center ${styles.title}`}>{t('SignUp:title')}</span>
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
      </div>
      <div className={`row center ${styles.sectionContainer}`}>
        <button type="submit" className={`${styles.button}`}>
          {t('SignUp:register')}
        </button>
        <NavLink to={Routes.Login} activeClassName={styles.bold}>
          <span className={`${styles.button} ${styles.already}`}>{t('Login:alreadyRegister')}</span>
        </NavLink>
      </div>
      {!!err && <span className={`column center ${styles.error}`}>{t('SignUp:error')}</span>}
    </form>
  );
}

SignUp.propTypes = {
  err: PropTypes.string.isRequired,
  onEmailChange: PropTypes.func.isRequired,
  onPasswordChange: PropTypes.func.isRequired,
  onSignUp: PropTypes.func.isRequired
};

export default SignUp;
