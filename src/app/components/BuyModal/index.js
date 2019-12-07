import React, { Component } from 'react';
import Modal from 'react-modal';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { reset, SubmissionError } from 'redux-form';
import { t } from 'i18next';

import { actionCreators as orderActions } from '../../../redux/Order/actions';
import { actionCreators as modalActions } from '../../../redux/Modal/actions';

import BuyModal from './layout';

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

class BuyModalContainer extends Component {
  handleCloseModal = () => {
    const { handleBuyModalChange, handleResetOrder, resetForm } = this.props;
    handleBuyModalChange(false);
    handleResetOrder();
    resetForm();
  };

  onBuy = ({ tokens, price }) => {
    if (tokens && price) {
      this.props.buy({ tokens, price: parseFloat(price.substring(1)) });
    } else {
      throw new SubmissionError({
        _error: t('Marketplace:emptyValues')
      });
    }
  };

  render() {
    const { err, showBuyModal, success } = this.props;
    return (
      <Modal isOpen={showBuyModal} onRequestClose={this.handleCloseModal} style={customStyles}>
        <BuyModal buy={this.onBuy} err={err} onCloseModal={this.handleCloseModal} success={success} />
      </Modal>
    );
  }
}

BuyModalContainer.propTypes = {
  buy: PropTypes.func,
  err: PropTypes.string,
  handleBuyModalChange: PropTypes.func,
  handleResetOrder: PropTypes.func,
  resetForm: PropTypes.func,
  showBuyModal: PropTypes.bool,
  success: PropTypes.bool
};

const mapStateToProps = store => ({
  user: store.auth.user,
  err: store.order.err,
  success: store.order.success,
  showBuyModal: store.modal.showBuyModal
});

const mapDispatchToProps = dispatch => ({
  buy: params => dispatch(orderActions.buy(params)),
  handleBuyModalChange: params => dispatch(modalActions.handleBuyModalChange(params)),
  handleResetOrder: () => dispatch(orderActions.handleResetOrder()),
  resetForm: () => dispatch(reset('BuyModal'))
});

export default connect(mapStateToProps, mapDispatchToProps)(BuyModalContainer);
