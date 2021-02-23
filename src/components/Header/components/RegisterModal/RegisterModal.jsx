import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import './registerModal.sass';

const RegisterModal = (props) => {
  const {
    visible,
    onClose,
    onSubmit,
  } = props;

  return (
    <Modal show={visible} onHide={onClose} className="register_modal">
      <Modal.Header closeButton>
        <Modal.Title>Регистрация</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={onSubmit}>
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
            <Form.Label>Потвердите пароль</Form.Label>
            <Form.Control type="password" placeholder="Введите пароль еще раз" name="password_confirm" />
          </Form.Group>
          <button type="submit" className="btn_submit">
            Зарегистрироваться
          </button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default RegisterModal;
