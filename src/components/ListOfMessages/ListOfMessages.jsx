import React, { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { Container, Col } from 'react-bootstrap';
import AddMessage from '../Form/AddMessage.jsx';
import { selecrorsMessages } from '../../slices/messagesReducer.js';
import { selectorsChannels } from '../../slices/chennelReducer.js';

const ListOfMessages = () => {
  const chatRef = useRef();
  const channels = useSelector(selectorsChannels.selectAll);
  const { currentChannelId } = useSelector((state) => state.channel);
  const [currentChannel] = channels.filter(({ id }) => id === currentChannelId);
  const messages = useSelector(selecrorsMessages.selectAll)
    .filter(({ channelId }) => channelId === currentChannelId);
  useEffect(() => {
    chatRef.current.scrollTop = chatRef.current.scrollHeight;
  }, [messages]);
  const { t } = useTranslation();
  return (
    <div className="col p-0 h-100">
      <div className="d-flex flex-column h-100">
        <Container className="border-bottom">
          <h4 className="text-primary bg-light">
            #
            {' '}
            {currentChannel?.name}
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
        <AddMessage />
      </div>

    </div>
  );
};

export default ListOfMessages;
