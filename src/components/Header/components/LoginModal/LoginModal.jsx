import { useState } from 'react';
import { Link } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Spinner from 'react-bootstrap/Spinner';
import './loginModal.sass';

const LoginModal = (props) => {
  const {
    visible,
    onClose,
    onClickRegister,
    onSubmit,
    loading,
    errorMessage,
  } = props;

  const [rememberMe, setRememberMe] = useState(true);

  return (
    <Modal show={visible} onHide={onClose} className="login_modal">
      {loading && (
        <div className="spinner-wrapper">
          <Spinner animation="border" role="status" variant="light" />
        </div>
      )}
      <Modal.Header closeButton>
        <Modal.Title>Войти</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={(e) => onSubmit(e, rememberMe)}>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control type="email" placeholder="Введите email" name="email" />
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Label>Пароль</Form.Label>
            <Form.Control type="password" placeholder="Введите пароль" name="password" />
            {errorMessage && (
              <div className="error-message">
                {errorMessage}
              </div>
            )}
          </Form.Group>
          <Form.Group controlId="formBasicCheckbox">
            <Form.Check type="checkbox" label="Запомнить меня" defaultChecked={rememberMe} onChange={(e) => setRememberMe(e.target.checked)} />
            <Form.Text className="text-muted">
              Нет аккаунта? <Link to="#" onClick={() => { onClose(); onClickRegister(); }}>Зарегистрироваться</Link>
            </Form.Text>
          </Form.Group>

          <button type="submit" className="btn_submit">
            Войти
          </button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default LoginModal;
