import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { removeChannelShow } from '../../slices/modalReducer.js';
// import { setConnectionErr } from '../../slices/messagesReducer.js';

const RemoveChannel = ({ socket }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const handleClose = () => dispatch(removeChannelShow());
  const { removeChannelModalState } = useSelector((state) => state.modal);
  const { removeId } = useSelector((state) => state.modal);
  console.log(socket);
  const handler = (e) => {
    e.preventDefault();
    if (socket.connected) {
      socket.emit('removeChannel', { id: removeId }, (response) => console.log(response));
      handleClose();
    }
  };
  return (
    <Modal
      show={removeChannelModalState}
      onHide={handleClose}
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title>{t('removeModal.header')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{t('removeModal.body')}</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          {t('removeModal.buttonClose')}
        </Button>
        <Button variant="danger" onClick={handler}>
          {t('removeModal.buttonOk')}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default RemoveChannel;
