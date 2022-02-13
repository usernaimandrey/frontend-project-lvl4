import React, { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector, useDispatch } from 'react-redux';
import {
  Nav, Button, Container, ButtonGroup, Dropdown,
} from 'react-bootstrap';
import {
  selectorsChannels, changeCannel,
} from '../../slices/chennelReducer.js';
import {
  addChannelShow, removeChannelShow, setRemoveId, setRenameId, renameChannelShow, setRenameName,
} from '../../slices/modalReducer.js';

const SideBar = () => {
  const sideRef = useRef();
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { currentChannelId } = useSelector((state) => state.channel);
  const channels = useSelector(selectorsChannels.selectAll);
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
  const handlerShowModalRename = (id) => (e) => {
    e.preventDefault();
    const renameChannelName = channels
      .find((channel) => channel.id === id);
    const { name } = renameChannelName;
    dispatch(setRenameName({ name }));
    dispatch(setRenameId({ id }));
    dispatch(renameChannelShow());
  };
  useEffect(() => {
    sideRef.current.scrollTop = sideRef.current.scrollHeight;
  }, [channels]);
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
          <Button variant="outline-info" size="sm" onClick={handlerShow}>
            {t('addChannel')}
            <span className="visually-hidden">{t('addChannel')}</span>
          </Button>
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
                onClick={handlerShowModalRename(id)}
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
