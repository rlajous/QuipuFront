import React from 'react';
import PropTypes from 'prop-types';
import { t } from 'i18next';
import { NavLink } from 'react-router-dom';
import { Field, reduxForm, Form } from 'redux-form';

import { required, email, minLength } from '../../../utils/inputValidations';
import Routes from '../../../constants/routes';
import InputLabel from '../../components/InputLabel';
import logo from '../../assets/logo_with_name.png';

import { FIELDS } from './constants';
import styles from './styles.module.scss';

const PASSWORD_MIN_LENGTH = 8;

const passwordValidation = [
  required(t('SignUp:required')),
  minLength(PASSWORD_MIN_LENGTH, t('SignUp:minLength8'))
];
const emailValidation = [required(t('SignUp:required')), email(t('SignUp:emailError'))];

const validate = values => {
  const errors = {};
  if (values[FIELDS.confirmPassword] !== values[FIELDS.password]) {
    errors[FIELDS.confirmPassword] = t('SignUp:missmatchPassword');
  }

  return errors;
};

function SignUp({ handleSubmit, signUp, err }) {
  return (
    <Form className={`column center full-width ${styles.formContainer}`} onSubmit={handleSubmit(signUp)}>
      <div className="column center m-bottom-3">
        <img src={logo} alt="Logo" className={`${styles.logo}`} />
      </div>
      <span className={`column center ${styles.title}`}>{t('SignUp:title')}</span>
      <div className={`column ${styles.sectionContainer}`}>
        <Field
          label={t('SignUp:email')}
          name={FIELDS.email}
          inputId={FIELDS.email}
          dataFor={FIELDS.email}
          inputType="text"
          type="text"
          component={InputLabel}
          validate={emailValidation}
          inputClassName={`m-bottom-2 full-width ${styles.input}`}
          textClassName={`${styles.label}`}
          placeholder={t('SignUp:emailPlaceholder')}
        />
        <Field
          label={t('SignUp:password')}
          name={FIELDS.password}
          inputId={FIELDS.password}
          dataFor={FIELDS.password}
          inputType="password"
          type="password"
          validate={passwordValidation}
          component={InputLabel}
          inputClassName={`m-bottom-2 full-width ${styles.input}`}
          textClassName={`${styles.label}`}
          placeholder={t('SignUp:passwordPlaceholder')}
        />
        <Field
          label={t('SignUp:confirmPassword')}
          name={FIELDS.confirmPassword}
          inputId={FIELDS.confirmPassword}
          dataFor={FIELDS.confirmPassword}
          inputType="password"
          type="password"
          validate={passwordValidation}
          component={InputLabel}
          inputClassName={`m-bottom-2 full-width ${styles.input}`}
          textClassName={`${styles.label}`}
          placeholder={t('SignUp:confirmPasswordPlaceholder')}
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
    </Form>
  );
}

SignUp.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  signUp: PropTypes.func.isRequired,
  err: PropTypes.string
};

export default reduxForm({
  form: 'signUp',
  validate
})(SignUp);
