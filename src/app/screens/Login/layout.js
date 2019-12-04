import React from 'react';
import PropTypes from 'prop-types';
import { t } from 'i18next';
import { NavLink } from 'react-router-dom';
import { Field, reduxForm, Form } from 'redux-form';

import { required, email } from '../../../utils/inputValidations';
import Routes from '../../../constants/routes';
import InputLabel from '../../components/InputLabel';
import logo from '../../assets/logo_with_name.png';

import { FIELDS } from './constants';
import styles from './styles.module.scss';

const passwordValidation = [required(t('SignUp:required'))];
const emailValidation = [required(t('SignUp:required')), email(t('SignUp:emailError'))];

function Login({ handleSubmit, onLogin, err }) {
  return (
    <Form className={`column center full-width ${styles.formContainer}`} onSubmit={handleSubmit(onLogin)}>
      <div className="column center m-bottom-3">
        <img src={logo} alt="Logo" className={`${styles.logo}`} />
      </div>
      <span className={`column center ${styles.title}`}>{t('Login:login')}</span>
      <div className={`column ${styles.sectionContainer}`}>
        <Field
          label={t('Login:email')}
          name={FIELDS.email}
          inputId={FIELDS.email}
          dataFor={FIELDS.email}
          inputType="email"
          type="email"
          component={InputLabel}
          validate={emailValidation}
          inputClassName={`m-bottom-2 full-width ${styles.input}`}
          textClassName={`${styles.label}`}
          placeholder={t('Login:emailPlaceholder')}
        />
        <Field
          label={t('Login:password')}
          name={FIELDS.password}
          inputId={FIELDS.password}
          dataFor={FIELDS.password}
          inputType="password"
          type="password"
          validate={passwordValidation}
          component={InputLabel}
          inputClassName={`m-bottom-2 full-width ${styles.input}`}
          textClassName={`${styles.label}`}
          placeholder={t('Login:passwordPlaceholder')}
        />
      </div>
      <div className={`row center ${styles.sectionContainer}`}>
        <button type="submit" className={`${styles.button}`}>
          {t('Login:enter')}
        </button>
        <NavLink to={Routes.SignUp} activeClassName={styles.bold}>
          <span className={styles.button}>{t('SignUp:register')}</span>
        </NavLink>
      </div>
      {!!err && <span className={`column center ${styles.error}`}>{t('Login:error')}</span>}
    </Form>
  );
}

Login.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  onLogin: PropTypes.func.isRequired,
  err: PropTypes.string
};

export default reduxForm({
  form: 'login'
})(Login);
