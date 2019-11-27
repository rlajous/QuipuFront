import React, { Component } from 'react';
import Modal from 'react-modal';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { t } from 'i18next';

import InputLabel from '../InputLabel';
import { actionCreators as userActions } from '../../../redux/Auth/actions';
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

class LoginModal extends Component {
  handleCloseModal = () => {
    const { handleBuyModalChange } = this.props;
    handleBuyModalChange(false);
  };

  handleLogin = e => {
    e.preventDefault();
    const { email, password } = this.props;
    this.props.login({ email, password });
  };

  onEmailChange = e => {
    const { value } = e.target;
    const { handleEmailChange } = this.props;
    handleEmailChange(value);
  };

  onPasswordChange = e => {
    const { value } = e.target;
    const { handlePasswordChange } = this.props;
    handlePasswordChange(value);
  };

  render() {
    const { err, showBuyModal } = this.props;
    return (
      <Modal
        isOpen={showBuyModal}
        onRequestClose={this.handleCloseModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <button type="button" onClick={this.handleCloseModal}>
          close
        </button>
        <form className="column center full-width" onSubmit={this.handleLogin}>
          <div className="card-header">
            <i className="fa fa-unlock icon-login" />
          </div>
          <div className="column m-bottom-2 ">
            <InputLabel
              label={t('Login:email')}
              name={FIELDS.email}
              inputId={FIELDS.email}
              dataFor={FIELDS.email}
              inputType="text"
              inputClassName="m-bottom-2 full-width "
              textClassName="m-bottom-2 full-width"
              placeholder={t('Login:emailPlaceholder')}
              handleChange={this.onEmailChange}
            />
            <InputLabel
              label={t('Login:password')}
              name={FIELDS.password}
              inputId={FIELDS.password}
              dataFor={FIELDS.password}
              inputType="password"
              inputClassName="m-bottom-2 full-width"
              textClassName="m-bottom-2 full-width"
              placeholder={t('Login:passwordPlaceholder')}
              handleChange={this.onPasswordChange}
            />
          </div>
          <div className="column center">
            <button type="submit" className="full-width m-bottom-1 ">
              {t('Login:enter')}
            </button>
          </div>
          {!!err && <span className="column center ">{t('Login:error')}</span>}
        </form>
      </Modal>
    );
  }
}

LoginModal.propTypes = {
  email: PropTypes.string,
  err: PropTypes.string,
  handleBuyModalChange: PropTypes.func,
  handleEmailChange: PropTypes.func,
  handlePasswordChange: PropTypes.func,
  login: PropTypes.func,
  password: PropTypes.string,
  showBuyModal: PropTypes.bool
};

const mapStateToProps = store => ({
  currentUser: store.auth.currentUser,
  email: store.auth.email,
  password: store.auth.password,
  err: store.auth.err,
  showBuyModal: store.modal.showBuyModal
});

const mapDispatchToProps = dispatch => ({
  login: params => dispatch(userActions.login(params)),
  handleEmailChange: params => dispatch(userActions.handleEmailChange(params)),
  handlePasswordChange: params => dispatch(userActions.handlePasswordChange(params)),
  handleBuyModalChange: params => dispatch(modalActions.handleBuyModalChange(params))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginModal);
