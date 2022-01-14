import React from 'react';
import { useSelector } from 'react-redux';
import { Nav, Button, Container } from 'react-bootstrap';
import { selectorsChannels } from '../../slices/chennelReducer.js';

const SideBar = () => {
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
          <h4>Каналы</h4>
          <Button variant="outline-info" size="sm">&#10010;</Button>
        </Container>
        {channel.map(({ id, name }) => <Nav.Link key={id} eventKey={id}>{`# ${name}`}</Nav.Link>)}
      </Nav>
    </div>
  );
};

export default SideBar;
