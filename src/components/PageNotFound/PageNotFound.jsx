import React from 'react';
import { Link } from 'react-router-dom';
import Page404 from '../../picture/404.jpg';

const PageNotFound = () => (
  <div className="text-center">
    <h1 className="text-center">Страница не найдена</h1>
    <img src={Page404} alt="404 Page not found" height="400" width="400" />
    <div className="text-center">
      <Link to="/">Вернутся на главную страницу</Link>
    </div>
  </div>
);

export default PageNotFound;
