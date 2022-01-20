import React from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { Nav, Button, Container } from 'react-bootstrap';
import { selectorsChannels } from '../../slices/chennelReducer.js';

const SideBar = () => {
  const { t } = useTranslation();
  const channel = useSelector(selectorsChannels.selectAll);
  const { currentChannelId } = useSelector((state) => state.channel);
  return (
    <div
      className="flex-column col-4 col-md-2 border-end pt-5 px-0 bg-light h-100 overflow-auto"
    >
      <Nav
        activeKey={currentChannelId}
        variant="tabs"
      >
        <Container className="d-flex justify-content-around">
          <h4>{t('sideBar')}</h4>
          <Button variant="outline-info" size="sm">&#10010;</Button>
        </Container>
        {channel.map(({ id, name }) => <Nav.Link className="d-flex flex-column" key={id} eventKey={id}>{`# ${name}`}</Nav.Link>)}
      </Nav>
    </div>
  );
};

export default SideBar;
