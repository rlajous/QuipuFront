import React from 'react';
import PropTypes from 'prop-types';
import { t } from 'i18next';
import { Field, reduxForm, Form } from 'redux-form';

import InputLabel from '../../components/InputLabel';
import { required, email } from '../../../utils/inputValidations';
import Loader from '../../components/Loader';
import { propTypes } from '../../../redux/Auth/reducer';

import { FIELDS } from './constants';
import styles from './styles.module.scss';

const passwordValidation = [required(t('SignUp:required'))];
const emailValidation = [required(t('SignUp:required')), email(t('SignUp:emailError'))];

const validate = values => {
  const errors = {};
  if (values[FIELDS.confirmPassword] !== values[FIELDS.newPassword]) {
    errors[FIELDS.confirmPassword] = t('SignUp:missmatchPassword');
  }
  return errors;
};

function Configuration({ handleSubmit, onEdit, err, onLogout, user, success, loading }) {
  return (
    <Form
      className={`column full-width ${styles.formContainer}`}
      onSubmit={handleSubmit(onEdit)}
      autoComplete="off"
    >
      <h1 className={`${styles.title}`}> {t('Configuration:title')}</h1>
      <div className={`column m-bottom-2 ${styles.sectionContainer}`}>
        <Field
          label={t('Configuration:email')}
          name={FIELDS.newEmail}
          inputId={FIELDS.newEmail}
          dataFor={FIELDS.newEmail}
          value={user.email}
          inputType="text"
          type="text"
          component={InputLabel}
          validate={emailValidation}
          inputClassName={`m-bottom-2 full-width ${styles.input}`}
          textClassName={`${styles.label}`}
          placeholder={t('Configuration:emailPlaceholder')}
        />
        <Field
          label={t('Configuration:password')}
          name={FIELDS.newPassword}
          inputId={FIELDS.newPassword}
          dataFor={FIELDS.newPassword}
          inputType="password"
          type="password"
          validate={passwordValidation}
          component={InputLabel}
          inputClassName={`m-bottom-2 full-width ${styles.input}`}
          textClassName={`${styles.label}`}
          placeholder={t('Configuration:passwordPlaceholder')}
        />
        <Field
          label={t('Configuration:confirmPassword')}
          name={FIELDS.confirmPassword}
          inputId={FIELDS.confirmPassword}
          dataFor={FIELDS.confirmPassword}
          inputType="password"
          type="password"
          validate={passwordValidation}
          component={InputLabel}
          inputClassName={`m-bottom-2 full-width ${styles.input}`}
          textClassName={`${styles.label}`}
          placeholder={t('Configuration:passwordPlaceholder')}
        />
      </div>
      <div className={`column ${styles.sectionContainer}`}>
        {!loading && (
          <>
            <button type="submit" className={`full-width m-bottom-3 ${styles.button}`}>
              {t('Configuration:save')}
            </button>
            <button type="button" onClick={onLogout} className={`full-width m-bottom-1 ${styles.button}`}>
              {t('Configuration:logout')}
            </button>
          </>
        )}
        {loading && (
          <div className={styles.loader}>
            <Loader />
          </div>
        )}
        {!!success && <span className={styles.success}>{t('Configuration:success')}</span>}
        {!!err && <span className={`column center ${styles.error}`}>{t('Configuration:error')}</span>}
      </div>
    </Form>
  );
}

Configuration.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  success: PropTypes.bool.isRequired,
  onEdit: PropTypes.func.isRequired,
  onLogout: PropTypes.func.isRequired,
  err: PropTypes.string,
  loading: PropTypes.bool,
  user: propTypes.user
};

export default reduxForm({
  form: 'signUp',
  validate
})(Configuration);
