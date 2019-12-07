import React, { Component } from 'react';
import Modal from 'react-modal';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { t } from 'i18next';
import { SubmissionError } from 'redux-form';

import { actionCreators as orderActions } from '../../../redux/Order/actions';
import { actionCreators as modalActions } from '../../../redux/Modal/actions';
import { propTypes } from '../../../redux/Auth/reducer';

import SellModal from './layout';

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

class SellModalContainer extends Component {
  handleCloseModal = () => {
    const { handleSellModalChange, handleResetOrder } = this.props;
    handleSellModalChange(false);
    handleResetOrder();
  };

  onSell = ({ tokens, price }) => {
    const { user, sell } = this.props;
    if (tokens > user.tokens) {
      throw new SubmissionError({
        _error: t('Marketplace:maxTokens') + user.tokens
      });
    }
    if (tokens && price) {
      sell({ tokens, price });
    } else {
      throw new SubmissionError({
        _error: t('Marketplace:emptyValues')
      });
    }
  };

  render() {
    const { err, showSellModal, success, user } = this.props;
    return (
      <Modal isOpen={showSellModal} onRequestClose={this.handleCloseModal} style={customStyles}>
        <SellModal
          sell={this.onSell}
          err={err}
          onCloseModal={this.handleCloseModal}
          success={success}
          user={user}
        />
      </Modal>
    );
  }
}

SellModalContainer.propTypes = {
  err: PropTypes.string,
  handleResetOrder: PropTypes.func,
  handleSellModalChange: PropTypes.func,
  sell: PropTypes.func,
  showSellModal: PropTypes.bool,
  success: PropTypes.bool,
  user: propTypes.user
};

const mapStateToProps = store => ({
  user: store.auth.user,
  err: store.order.err,
  success: store.order.success,
  showSellModal: store.modal.showSellModal
});

const mapDispatchToProps = dispatch => ({
  sell: params => dispatch(orderActions.sell(params)),
  handleSellModalChange: params => dispatch(modalActions.handleSellModalChange(params)),
  handleResetOrder: () => dispatch(orderActions.handleResetOrder())
});

export default connect(mapStateToProps, mapDispatchToProps)(SellModalContainer);
