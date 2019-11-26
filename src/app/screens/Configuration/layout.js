import React from 'react';
import PropTypes from 'prop-types';
import { t } from 'i18next';

import InputLabel from '../../components/InputLabel';

import { FIELDS } from './constants';
import styles from './styles.module.scss';

function Configuration({ onEmailChange, onPasswordChange, onEdit, onLogout }) {
  return (
    <form className={`column full-width ${styles.formContainer}`} onSubmit={onEdit} autoComplete="off">
      <h1 className={`${styles.title}`}> {t('Configuration:title')}</h1>
      <div className={`column m-bottom-2 ${styles.sectionContainer}`}>
        <InputLabel
          label={t('Configuration:email')}
          name={FIELDS.newEmail}
          inputId={FIELDS.newEmail}
          dataFor={FIELDS.newEmail}
          inputType="text"
          inputClassName={`m-bottom-2 full-width ${styles.input}`}
          textClassName={`${styles.label}`}
          placeholder={t('Configuration:emailPlaceholder')}
          handleChange={onEmailChange}
        />
        <InputLabel
          label={t('Configuration:password')}
          name={FIELDS.newPassword}
          inputId={FIELDS.newPassword}
          dataFor={FIELDS.newPassword}
          inputType="password"
          inputClassName={`m-bottom-2 full-width ${styles.input}`}
          textClassName={`${styles.label}`}
          placeholder={t('Configuration:passwordPlaceholder')}
          handleChange={onPasswordChange}
        />
      </div>
      <div className={`column ${styles.sectionContainer}`}>
        <button type="submit" className={`full-width m-bottom-3 ${styles.button}`}>
          {t('Configuration:save')}
        </button>
        <button type="button" onClick={onLogout} className={`full-width m-bottom-1 ${styles.button}`}>
          {t('Configuration:logout')}
        </button>
      </div>
    </form>
  );
}

Configuration.propTypes = {
  onEdit: PropTypes.func.isRequired,
  onEmailChange: PropTypes.func.isRequired,
  onLogout: PropTypes.func.isRequired,
  onPasswordChange: PropTypes.func.isRequired
};

export default Configuration;
