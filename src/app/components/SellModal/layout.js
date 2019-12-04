import React from 'react';
import PropTypes from 'prop-types';
import { t } from 'i18next';
import { Field, reduxForm, Form } from 'redux-form';

import CurrencyInput from '../CurrencyInput';
import { required, minValue, stringMinValue } from '../../../utils/inputValidations';
import InputLabel from '../InputLabel';
import { propTypes } from '../../../redux/Auth/reducer';

import { FIELDS, MIN_PRICE, MIN_TOKENS } from './constants';
import styles from './styles.module.scss';

const tokenValidation = [required(t('SignUp:required')), minValue(t('Marketplace:minTokens'), MIN_TOKENS)];

const priceValidation = [
  required(t('SignUp:required')),
  stringMinValue(t('Marketplace:minPrice'), MIN_PRICE)
];

function SellModal({ error, handleSubmit, onCloseModal, sell, success, user }) {
  return (
    <>
      <button type="button" onClick={onCloseModal} className={styles.close}>
        {t('Marketplace:close')}
      </button>
      <Form className="column center full-width" onSubmit={handleSubmit(sell)}>
        {user && (
          <div className={styles.container}>
            <label className={styles.label} htmlFor="price">
              {t('Marketplace:yourTokens')}
            </label>
            <span className={styles.number}>{user.tokens}</span>
          </div>
        )}
        <div className="column m-bottom-2 ">
          <Field
            label={t('Marketplace:tokens')}
            className={styles.inputContainer}
            name={FIELDS.tokens}
            inputId={FIELDS.tokens}
            dataFor={FIELDS.tokens}
            inputType="number"
            component={InputLabel}
            type="number"
            inputClassName={styles.input}
            textClassName={styles.inputText}
            validate={tokenValidation}
            placeholder={t('Marketplace:tokensPlaceholder')}
          />
          <Field
            label={t('Marketplace:price')}
            className={styles.container}
            name={FIELDS.price}
            inputId={FIELDS.price}
            dataFor={FIELDS.price}
            component={CurrencyInput}
            inputClassName={styles.input}
            textClassName={styles.label}
            validate={priceValidation}
          />
        </div>
        <div className="column center">
          <button type="submit" className={`${styles.button} ${error || success ? styles.error : ''}`}>
            {t('Marketplace:sell')}
          </button>
        </div>
        {!!error && <span className={styles.error}>{error}</span>}
        {!!success && <span className={styles.success}>{t('Marketplace:success')}</span>}
      </Form>
    </>
  );
}

SellModal.propTypes = {
  error: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  sell: PropTypes.func.isRequired,
  success: PropTypes.bool.isRequired,
  onCloseModal: PropTypes.func.isRequired,
  user: propTypes.user
};

export default reduxForm({
  form: 'SellModal'
})(SellModal);
