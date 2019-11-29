import React, { Component } from 'react';
import Modal from 'react-modal';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { t } from 'i18next';
import moment from 'moment';
import CurrencyInput from 'react-currency-input';

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

class BuyModal extends Component {
  handleCloseModal = () => {
    const { handleBuyModalChange, handlePriceChange, handleTokenChange } = this.props;
    handleBuyModalChange(false);
    handleTokenChange(0);
    handlePriceChange(0);
  };

  handleSell = e => {
    e.preventDefault();
    const { tokens, price } = this.props;
    this.props.buy({ tokens, price, date: moment('DD-MM-YYYY') });
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
    const { err, showBuyModal, success, price } = this.props;
    return (
      <Modal isOpen={showBuyModal} onRequestClose={this.handleCloseModal} style={customStyles}>
        <button type="button" onClick={this.handleCloseModal} className={styles.close}>
          {t('Marketplace:close')}
        </button>
        <form className="column center full-width" onSubmit={this.handleSell}>
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
              {t('Marketplace:buy')}
            </button>
          </div>
          {!!err && <span className={styles.error}>{t('Marketplace:error')}</span>}
          {!!success && <span className={styles.success}>{t('Marketplace:success')}</span>}
        </form>
      </Modal>
    );
  }
}

BuyModal.propTypes = {
  buy: PropTypes.func,
  err: PropTypes.string,
  handleBuyModalChange: PropTypes.func,
  handlePriceChange: PropTypes.func,
  handleTokenChange: PropTypes.func,
  price: PropTypes.number,
  showBuyModal: PropTypes.bool,
  success: PropTypes.string,
  tokens: PropTypes.number
};

const mapStateToProps = store => ({
  user: store.auth.user,
  price: store.order.price,
  tokens: store.order.tokens,
  err: store.order.err,
  success: store.order.success,
  showBuyModal: store.modal.showBuyModal
});

const mapDispatchToProps = dispatch => ({
  buy: params => dispatch(orderActions.buy(params)),
  handleTokenChange: params => dispatch(orderActions.handleTokenChange(params)),
  handlePriceChange: params => dispatch(orderActions.handlePriceChange(params)),
  handleBuyModalChange: params => dispatch(modalActions.handleBuyModalChange(params))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BuyModal);
