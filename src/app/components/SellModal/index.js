import React, { Component } from 'react';
import Modal from 'react-modal';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { t } from 'i18next';

import InputLabel from '../InputLabel';
import { actionCreators as orderActions } from '../../../redux/Order/actions';
import { actionCreators as modalActions } from '../../../redux/Modal/actions';

import { FIELDS } from './constants';

import './styles.scss';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)'
  }
};

class SellModal extends Component {
  handleCloseModal = () => {
    const { handleSellModalChange } = this.props;
    handleSellModalChange(false);
  };

  handleSell = e => {
    e.preventDefault();
    const { tokens, price } = this.props;
    this.props.sell({ tokens, price });
  };

  onTokenChange = e => {
    const { value } = e.target;
    const { handleTokenChange } = this.props;
    handleTokenChange(value);
  };

  onPriceChange = e => {
    const { value } = e.target;
    const { handlePriceChange } = this.props;
    handlePriceChange(value);
  };

  render() {
    const { err, showSellModal, success } = this.props;
    return (
      <Modal isOpen={showSellModal} onRequestClose={this.handleCloseModal} style={customStyles}>
        <button type="button" onClick={this.handleCloseModal}>
          close
        </button>
        <form className="column center full-width" onSubmit={this.handleSell}>
          <div className="card-header">
            <i className="fa fa-unlock icon-login" />
          </div>
          <div className="column m-bottom-2 ">
            <InputLabel
              label={t('Marketplace:tokens')}
              name={FIELDS.tokens}
              inputId={FIELDS.tokens}
              dataFor={FIELDS.tokens}
              inputType="number"
              inputClassName="m-bottom-2 full-width "
              textClassName="m-bottom-2 full-width"
              placeholder={t('Marketplace:tokensPlaceholder')}
              handleChange={this.onTokenChange}
            />
            <InputLabel
              label={t('Marketplace:price')}
              name={FIELDS.price}
              inputId={FIELDS.price}
              dataFor={FIELDS.price}
              inputType="number"
              inputClassName="m-bottom-2 full-width"
              textClassName="m-bottom-2 full-width"
              placeholder={t('Marketplace:pricePlaceholder')}
              handleChange={this.onPriceChange}
            />
          </div>
          <div className="column center">
            <button type="submit" className="full-width m-bottom-1 ">
              {t('Marketplace:sell')}
            </button>
          </div>
          {!!err && <span className="column center ">{t('Marketplace:error')}</span>}
          {!!success && <span className="column center ">{t('Marketplace:success')}</span>}
        </form>
      </Modal>
    );
  }
}

SellModal.propTypes = {
  err: PropTypes.string,
  handlePriceChange: PropTypes.func,
  handleSellModalChange: PropTypes.func,
  handleTokenChange: PropTypes.func,
  price: PropTypes.number,
  sell: PropTypes.func,
  showSellModal: PropTypes.bool,
  success: PropTypes.string,
  tokens: PropTypes.number
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
  handleSellModalChange: params => dispatch(modalActions.handleSellModalChange(params))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SellModal);
