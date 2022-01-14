import React from 'react';
import { Spinner } from 'react-bootstrap';

const CustomSpinner = () => (
  <div className="row justify-content-center align-content-center h-100">
    <Spinner animation="border" role="status">
      <span className="visually-hidden">Loading...</span>
    </Spinner>
  </div>
);

export default CustomSpinner;
