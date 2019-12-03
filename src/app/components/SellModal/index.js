import React, { Component } from 'react';
import Modal from 'react-modal';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { t } from 'i18next';
import CurrencyInput from 'react-currency-input';
import moment from 'moment';

import InputLabel from '../InputLabel';
import { actionCreators as orderActions } from '../../../redux/Order/actions';
import { actionCreators as modalActions } from '../../../redux/Modal/actions';

import { FIELDS } from './constants';
import styles from './styles.module.scss';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    width: '300px',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    display: 'flex',
    flexDirection: 'column'
  }
};

class SellModal extends Component {
  handleCloseModal = () => {
    const { handleSellModalChange, handleResetOrder } = this.props;
    handleSellModalChange(false);
    handleResetOrder();
  };

  handleSell = e => {
    e.preventDefault();
    const { tokens, price } = this.props;
    this.props.sell({ tokens, price, date: moment('DD-MM-YYYY') });
  };

  onTokenChange = e => {
    const { value } = e.target;
    const { handleTokenChange } = this.props;
    handleTokenChange(value);
  };

  handlePriceChange = (event, maskedvalue, floatvalue) => {
    const { handlePriceChange } = this.props;
    handlePriceChange(floatvalue);
  };

  render() {
    const { err, showSellModal, success, price, user } = this.props;
    return (
      <Modal isOpen={showSellModal} onRequestClose={this.handleCloseModal} style={customStyles}>
        <button type="button" onClick={this.handleCloseModal} className={styles.close}>
          {t('Marketplace:close')}
        </button>
        <form className="column center full-width" onSubmit={this.handleSell}>
          {user && (
            <div className={styles.container}>
              <label className={styles.label} htmlFor="price">
                {t('Marketplace:yourTokens')}
              </label>
              <span className={styles.number}>{user.tokens}</span>
            </div>
          )}
          <div className="column m-bottom-2 ">
            <InputLabel
              label={t('Marketplace:tokens')}
              className={styles.inputContainer}
              name={FIELDS.tokens}
              inputId={FIELDS.tokens}
              dataFor={FIELDS.tokens}
              inputType="number"
              inputClassName={styles.input}
              textClassName={styles.inputText}
              placeholder={t('Marketplace:tokensPlaceholder')}
              handleChange={this.onTokenChange}
            />
            <div className={styles.container}>
              <label className={styles.label} htmlFor="price">
                {t('Marketplace:price')}
              </label>
              <CurrencyInput
                className={styles.input}
                prefix="$"
                decimalSeparator=","
                thousandSeparator="."
                precision="2"
                id="price"
                value={price}
                onChangeEvent={this.handlePriceChange}
              />
            </div>
          </div>
          <div className="column center">
            <button type="submit" className={styles.button}>
              {t('Marketplace:sell')}
            </button>
          </div>
          {!!err && <span className={styles.error}>{t('Marketplace:error')}</span>}
          {!!success && <span className={styles.success}>{t('Marketplace:success')}</span>}
        </form>
      </Modal>
    );
  }
}

SellModal.propTypes = {
  err: PropTypes.string,
  handlePriceChange: PropTypes.func,
  handleResetOrder: PropTypes.func,
  handleSellModalChange: PropTypes.func,
  handleTokenChange: PropTypes.func,
  price: PropTypes.number,
  sell: PropTypes.func,
  showSellModal: PropTypes.bool,
  success: PropTypes.string,
  tokens: PropTypes.number,
  user: PropTypes.objectOf
};

const mapStateToProps = store => ({
  user: store.auth.user,
  price: store.order.price,
  tokens: store.order.tokens,
  err: store.order.err,
  success: store.order.success,
  showSellModal: store.modal.showSellModal
});

const mapDispatchToProps = dispatch => ({
  sell: params => dispatch(orderActions.sell(params)),
  handleTokenChange: params => dispatch(orderActions.handleTokenChange(params)),
  handlePriceChange: params => dispatch(orderActions.handlePriceChange(params)),
  handleSellModalChange: params => dispatch(modalActions.handleSellModalChange(params)),
  handleResetOrder: () => dispatch(orderActions.handleResetOrder())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SellModal);
