import React from 'react';
import PropTypes from 'prop-types';
import { t } from 'i18next';
import { Field, reduxForm, Form } from 'redux-form';

import { required, minValue } from '../../../utils/inputValidations';
import InputLabel from '../InputLabel';

import { FIELDS, MIN_PRICE, MIN_TOKENS } from './constants';
import styles from './styles.module.scss';

const tokenValidation = [required(t('SignUp:required')), minValue(t('Marketplace:minTokens'), MIN_TOKENS)];

const priceValidation = [required(t('SignUp:required')), minValue(t('Marketplace:minPrice'), MIN_PRICE)];

function BuyModal({ handleSubmit, onCloseModal, buy, error, success }) {
  return (
    <>
      <button type="button" onClick={onCloseModal} className={styles.close}>
        {t('Marketplace:close')}
      </button>
      <Form className="column center full-width" onSubmit={handleSubmit(buy)}>
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
            className={styles.inputContainer}
            name={FIELDS.price}
            inputId={FIELDS.price}
            dataFor={FIELDS.price}
            inputType="number"
            component={InputLabel}
            type="number"
            inputClassName={styles.input}
            textClassName={styles.inputText}
            validate={priceValidation}
            placeholder={t('Marketplace:tokensPlaceholder')}
          />
        </div>
        <div className="column center">
          <button type="submit" className={`${styles.button} ${error || success ? 'm-bottom-4' : ''}`}>
            {t('Marketplace:buy')}
          </button>
        </div>
        {!!error && <span className={styles.error}>{error}</span>}
        {!!success && <span className={styles.success}>{t('Marketplace:success')}</span>}
      </Form>
    </>
  );
}

BuyModal.propTypes = {
  buy: PropTypes.func.isRequired,
  error: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  success: PropTypes.bool.isRequired,
  onCloseModal: PropTypes.func.isRequired
};

export default reduxForm({
  form: 'BuyModal'
})(BuyModal);
