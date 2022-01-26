import React, { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector, useDispatch } from 'react-redux';
import { Nav, Button, Container } from 'react-bootstrap';
import { selectorsChannels, addChannel, changeCannel } from '../../slices/chennelReducer.js';

const SideBar = ({
  handlerShow, socket,
}) => {
  const sideRef = useRef();
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { currentChannelId } = useSelector((state) => state.channel);
  const channels = useSelector(selectorsChannels.selectAll);
  const channelChangeHandler = (id) => (e) => {
    e.preventDefault();
    dispatch(changeCannel({ id }));
  };
  useEffect(() => {
    sideRef.current.scrollTop = sideRef.current.scrollHeight;
  }, [channels]);
  useEffect(() => {
    socket.on('newChannel', (channel) => {
      dispatch(addChannel({ channel }));
    });
  });
  return (
    <div
      className="flex-column col-4 col-md-2 border-end pt-5 px-0 bg-light h-100 overflow-auto"
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
        <Container className="overflow-auto" ref={sideRef}>
          {channels.map(({ id, name }) => (
            <Nav.Link
              className="w-100 rounded-0 text-start btn btn-secondary"
              key={id}
              eventKey={id}
              onClick={channelChangeHandler(id)}
            >
              <span className="me-1">#</span>
              {name}

            </Nav.Link>
          ))}
        </Container>
      </Nav>
    </div>
  );
};

export default SideBar;
