import { useState } from 'react';
import ReCaptcha from 'react-google-recaptcha';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Spinner from 'react-bootstrap/Spinner';
import './registerModal.sass';

const RegisterModal = (props) => {
  const {
    visible,
    onClose,
    onSubmit,
    loading,
    errorMessage,
  } = props;

  const [captchaToken, setCaptchaToken] = useState('');

  const localOnSubmit = (e) => {
    e.preventDefault();

    if (captchaToken !== '') {
      onSubmit(e, captchaToken);
    }
  }

  const captchaOnChange = (token) => {
    setCaptchaToken(token);
  }

  return (
    <Modal show={visible} onHide={onClose} className="register_modal">
      {loading && (
        <div className="spinner-wrapper">
          <Spinner animation="border" role="status" variant="light" />
        </div>
      )}
      <Modal.Header closeButton>
        <Modal.Title>Регистрация</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={localOnSubmit}>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control type="email" placeholder="Введите email" name="email" />
          </Form.Group>
          <Form.Group controlId="formBasicLogin">
            <Form.Label>Логин</Form.Label>
            <Form.Control type="text" placeholder="Введите логин" name="login" />
          </Form.Group>
          <Form.Group controlId="formBasicPassword">
            <Form.Label>Пароль</Form.Label>
            <Form.Control type="password" placeholder="Введите пароль" name="password" />
          </Form.Group>
          <Form.Group controlId="formBasicPasswordAgain">
            <Form.Label>Подтвердите пароль</Form.Label>
            <Form.Control type="password" placeholder="Введите пароль еще раз" name="password_confirm" />
            {errorMessage && (
              <div className="error-message">
                {errorMessage}
              </div>
            )}
          </Form.Group>
          <Form.Group>
            <ReCaptcha
              sitekey="6Lca7n0aAAAAAGjJHRTynIKloxgNaNnTBXIgtRa0"
              onChange={captchaOnChange}
            />
          </Form.Group>
          <button disabled={captchaToken === ''} type="submit" className="btn_submit">
            Зарегистрироваться
          </button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default RegisterModal;
