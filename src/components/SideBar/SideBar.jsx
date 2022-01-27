import React, { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector, useDispatch } from 'react-redux';
import {
  Nav, Button, Container, ButtonGroup, Dropdown,
} from 'react-bootstrap';
import {
  selectorsChannels, addChannel, changeCannel, removeChannel,
} from '../../slices/chennelReducer.js';
import { addChannelShow, removeChannelShow, setRemoveId } from '../../slices/modalReducer.js';

const SideBar = ({ socket }) => {
  const sideRef = useRef();
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { currentChannelId } = useSelector((state) => state.channel);
  const channels = useSelector(selectorsChannels.selectAll);
  const defaultChannel = channels.find(({ name }) => name === 'general');
  const channelChangeHandler = (id) => (e) => {
    e.preventDefault();
    dispatch(changeCannel({ id }));
  };
  const handlerShow = (e) => {
    e.preventDefault();
    dispatch(addChannelShow());
  };
  const handlerShowModalRemove = (id) => (e) => {
    e.preventDefault();
    dispatch(setRemoveId({ id }));
    dispatch(removeChannelShow());
  };
  useEffect(() => {
    sideRef.current.scrollTop = sideRef.current.scrollHeight;
  }, [channels]);
  useEffect(() => {
    socket.on('newChannel', (channel) => {
      dispatch(addChannel({ channel }));
    });
  });
  useEffect(() => {
    socket.on('removeChannel', ({ id }) => {
      dispatch(removeChannel(id));
      dispatch(changeCannel({ id: defaultChannel.id }));
    });
  });
  return (
    <div
      className="col-4 col-md-2 border-end pt-5 px-0 bg-light"
      ref={sideRef}
    >
      <Nav
        activeKey={currentChannelId}
        variant="tabs"
      >
        <Container className="d-flex justify-content-around">
          <h4>{t('sideBar')}</h4>
          <Button variant="outline-info" size="sm" onClick={handlerShow}>&#10010;</Button>
        </Container>
        {channels.map(({ id, name, removable }) => (!removable ? (

          <Nav.Link
            className="w-100 rounded-0 text-start btn btn-secondary w-100"
            key={id}
            eventKey={id}
            onClick={channelChangeHandler(id)}
          >
            <span className="me-1">#</span>
            {name}

          </Nav.Link>
        ) : (
          <Dropdown as={ButtonGroup} key={id} className="d-flex w-100 text-start">
            <Button variant={id === currentChannelId ? 'secondary' : null} className="d-flex" onClick={channelChangeHandler(id)}>
              <span className="me-1">#</span>
              {name}
            </Button>

            <Dropdown.Toggle split variant={id === currentChannelId ? 'secondary' : null} id="dropdown-button-drop-end" />

            <Dropdown.Menu drop="down">
              <Dropdown.Item
                href="#/action-1"
                onClick={handlerShowModalRemove(id)}
              >
                {t('newChannel.del')}
              </Dropdown.Item>
              <Dropdown.Item
                href="#/action-2"
              >
                {t('newChannel.rename')}
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        )))}
      </Nav>
    </div>
  );
};

export default SideBar;
