import React, { useEffect } from 'react';
import { Container } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { fetchGetData } from '../../slices/chennelReducer.js';
import SideBar from '../SideBar/SideBar.jsx';
import ListOfMessages from '../ListOfMessages/ListOfMessages.jsx';
import CustomSpinner from '../Spinner/CustomSpinner.jsx';
import PageNotFound from '../PageNotFound/PageNotFound.jsx';

const MainPage = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchGetData());
  }, [dispatch]);
  const { loading } = useSelector((state) => state.channel);
  switch (loading) {
    case 'no data': {
      return <CustomSpinner />;
    }
    case 'loading': {
      return <CustomSpinner />;
    }
    case 'success': {
      return (
        <Container className="h-100 overflow-hidden rounded shadow my-4">
          <div className="row h-100 bg-white flex-md-row">
            <SideBar />
            <ListOfMessages />
          </div>
        </Container>
      );
    }
    case 'failed': {
      return <PageNotFound header="Проблеммы с сетью" />;
    }
    default: {
      throw new Error(`Unknow state: ${loading}`);
    }
  }
};

export default MainPage;
