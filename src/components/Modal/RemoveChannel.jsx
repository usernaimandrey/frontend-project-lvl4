import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { removeChannelShow } from '../../slices/modalReducer.js';
import { setConnectionErr } from '../../slices/messagesReducer.js';

const RemoveChannel = ({ socket }) => {
  const [isSubmiting, setSubmiting] = useState(false);
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const handleClose = () => dispatch(removeChannelShow());
  const { removeChannelModalState } = useSelector((state) => state.modal);
  const { removeId } = useSelector((state) => state.modal);
  const handler = (e) => {
    e.preventDefault();
    if (socket.connected) {
      socket.emit('removeChannel', { id: removeId }, () => handleClose());
    } else {
      setSubmiting(true);
      setSubmiting(false);
      dispatch(setConnectionErr());
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
        <Button variant="secondary" disabled={isSubmiting} onClick={handleClose}>
          {t('removeModal.buttonClose')}
        </Button>
        <Button variant="danger" disabled={isSubmiting} onClick={handler}>
          {t('removeModal.buttonOk')}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default RemoveChannel;
