import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Container } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { io } from 'socket.io-client';
import routes from '../../routes.js';
import { fetchGetData } from '../../slices/chennelReducer.js';
import SideBar from '../SideBar/SideBar.jsx';
import ListOfMessages from '../ListOfMessages/ListOfMessages.jsx';
import CustomSpinner from '../Spinner/CustomSpinner.jsx';
import PageNotFound from '../PageNotFound/PageNotFound.jsx';
import AddChannel from '../Modal/AddChannel.jsx';

const MainPage = () => {
  const [showModalAdd, setShowModalAdd] = useState(false);
  const handleModalAdd = () => setShowModalAdd(!showModalAdd);
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const url = process.env.NODE_ENV === 'production' ? routes.getUrlProduction() : routes.getUrlDev();
  const socket = io(url);
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
            <AddChannel show={showModalAdd} handler={handleModalAdd} socket={socket} />
            <SideBar
              handlerShow={handleModalAdd}
              socket={socket}
            />
            <ListOfMessages socket={socket} />
          </div>
        </Container>
      );
    }
    case 'failed': {
      return <PageNotFound header={t('pageNotFound.networkErr')} />;
    }
    default: {
      throw new Error(`Unknow state: ${loading}`);
    }
  }
};

export default MainPage;
