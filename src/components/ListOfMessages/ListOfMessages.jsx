import React, { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector, useDispatch } from 'react-redux';
import { Container, Col } from 'react-bootstrap';
import { io } from 'socket.io-client';
import routes from '../../routes.js';
import AddMessage from '../Form/AddMessage.jsx';
import { selecrorsMessages, addNewMessages } from '../../slices/messagesReducer.js';
import { selectorsChannels } from '../../slices/chennelReducer.js';

const ListOfMessages = () => {
  const url = process.env.NODE_ENV === 'production' ? routes.getUrlProduction() : routes.getUrlDev();
  const socket = io(url, {
    reconnectionDelayMax: 10000,
  });
  const messages = useSelector(selecrorsMessages.selectAll);
  const channels = useSelector(selectorsChannels.selectAll);
  const dispatch = useDispatch();
  const chatRef = useRef();
  useEffect(() => {
    chatRef.current.scrollTop = chatRef.current.scrollHeight;
  }, [messages]);
  useEffect(() => {
    socket.on('newMessage', (msg) => {
      dispatch(addNewMessages({ msg }));
    });
  }, []);
  const { t } = useTranslation();
  const { currentChannelId } = useSelector((state) => state.channel);
  const [currentChannel] = channels.filter(({ id }) => id === currentChannelId);
  return (
    <div className="col p-0 h-100">
      <div className="d-flex flex-column h-100">
        <Container className="border-bottom">
          <h4 className="text-primary bg-light">
            #
            {' '}
            {currentChannel.name}
          </h4>
          <p className="text-secondary">
            {t('messageBox.key', { count: messages.length })}
          </p>
        </Container>
        <Container ref={chatRef} className="overflow-auto mt-2 my-3 mb-5">
          <Col>
            {messages.map(({ user, text, id }) => (
              <Container key={id} className="mb-4 border-bottom text-break">
                <p>
                  <strong className="text-danger">{`${user}: `}</strong>
                  {text}
                </p>
              </Container>
            ))}
          </Col>
        </Container>
        <AddMessage socket={socket} />
      </div>

    </div>
  );
};

export default ListOfMessages;
