import React from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { Container, Col } from 'react-bootstrap';
import AddMessage from '../Form/AddMessage.jsx';
import { selecrorsMessages } from '../../slices/messagesReducer.js';
import { selectorsChannels } from '../../slices/chennelReducer.js';

const ListOfMessages = () => {
  const { t } = useTranslation();
  const messages = useSelector(selecrorsMessages.selectAll);
  const channels = useSelector(selectorsChannels.selectAll);
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
        <Container className="overflow-auto mt-2 my-3 mb-5">
          <Col>
            <p>
              <strong>Andrey: </strong>
              Hello
            </p>
            <p>
              <strong>Andrey: </strong>
              Hello
            </p>
            <p>
              <strong>Andrey: </strong>
              Hello
            </p>
          </Col>
        </Container>
        <AddMessage />
      </div>

    </div>
  );
};

export default ListOfMessages;
