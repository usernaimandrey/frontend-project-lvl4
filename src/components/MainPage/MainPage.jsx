import React from 'react';
import { useLocation } from 'react-router-dom';

const MainPage = () => {
  const location = useLocation();
  console.log(location);
  return (
    <div>Main</div>
  );
};

export default MainPage;
