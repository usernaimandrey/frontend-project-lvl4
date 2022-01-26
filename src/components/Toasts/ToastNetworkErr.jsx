import React from 'react';
import { Toast, ToastContainer } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useSelector, useDispatch } from 'react-redux';
import { setConnectionErr } from '../../slices/messagesReducer.js';

const ToastNetworkErr = () => {
  const { t } = useTranslation();
  const { connectionErr } = useSelector((state) => state.messages);
  const dispatch = useDispatch();
  return (
    <ToastContainer className="position-absolute bottom-0 end-0">
      <Toast
        onClose={() => dispatch(setConnectionErr())}
        className="d-inline-block m-1"
        bg="danger"
        show={connectionErr}
        delay={5000}
        autohide
      >
        <Toast.Header>
          <strong className="me-auto">{t('toast.connectionErrHeader')}</strong>
        </Toast.Header>
        <Toast.Body className="text-white">
          {t('toast.connectionErrBody')}
        </Toast.Body>
      </Toast>
    </ToastContainer>
  );
};

export default ToastNetworkErr;
