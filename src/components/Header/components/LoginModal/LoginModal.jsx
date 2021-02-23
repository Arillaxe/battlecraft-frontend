import { Link } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import './loginModal.sass';

const LoginModal = (props) => {
  const {
    visible,
    onClose,
    onClickRegister,
    onSubmit,
  } = props;

  return (
    <Modal show={visible} onHide={onClose} className="login_modal">
      <Modal.Header closeButton>
        <Modal.Title>Войти</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={onSubmit}>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control type="email" placeholder="Введите email" name="email" />
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Label>Пароль</Form.Label>
            <Form.Control type="password" placeholder="Введите пароль" name="password" />
          </Form.Group>
          <Form.Group controlId="formBasicCheckbox">
            <Form.Check type="checkbox" label="Запомнить меня" defaultChecked />
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
