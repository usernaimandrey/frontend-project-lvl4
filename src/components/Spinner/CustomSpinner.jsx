import React from 'react';
import { useTranslation } from 'react-i18next';
import { Spinner } from 'react-bootstrap';

const CustomSpinner = () => {
  const { t } = useTranslation();
  return (
    <div className="row justify-content-center align-content-center h-100">
      <Spinner animation="border" role="status">
        <span className="visually-hidden">{t('spiner')}</span>
      </Spinner>
    </div>
  );
};

export default CustomSpinner;
