import { useSelector } from 'react-redux';
import Modal from 'react-bootstrap/Modal';
import './itemModal.sass';

const privilageMappings = {
  privilege: 'привелегия',
  item: 'предмет',
};

const ItemModal = (props) => {
  const {
    item,
    visible,
    onClose,
    buyItem,
  } = props;

  const theme = useSelector(({ app }) => app.theme);

  return (
    <Modal show={visible} onHide={onClose} className={`itemModal${theme === 'dark' ? ' dark' : ''}`}>
      <Modal.Header closeButton>
        <Modal.Title>{item.title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="itemModal-imageWrapper">
          <img src={`${process.env.REACT_APP_SERVER_HOST}/images/${item.image}`} />
        </div>
        <div className="itemModal-itemInfo">
          <div className="itemModal-itemInfo-section">
            <div className="itemModal-itemInfo-title">Тип: </div>
            <div className="itemModal-item-text">{privilageMappings[item.type]}</div>
          </div>
          <div className="itemModal-itemInfo-section">
            <div className="itemModal-itemInfo-title">Цена: </div>
            <div className="itemModal-item-text">{item.price} монет</div>
          </div>
        </div>
        <button className="btn_submit" onClick={() => buyItem(item)}>
          Купить
        </button>
      </Modal.Body>
    </Modal>
  );
};

export default ItemModal;
