import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import Page404 from '../../picture/404.jpg';

const PageNotFound = (props) => {
  const { header } = props;
  const { t } = useTranslation();
  return (
    <div className="text-center">
      <h1 className="text-center">{header}</h1>
      <img src={Page404} alt="404 Page not found" height="400" width="400" />
      <div className="text-center">
        <Link to="/">{t('pageNotFound.redirect')}</Link>
      </div>
    </div>
  );
};

export default PageNotFound;
