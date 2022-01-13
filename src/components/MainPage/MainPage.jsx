import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectors,
  fetchGetData,
} from '../../slices/chennelReducer.js';
import { selecrorsMessages } from '../../slices/messagesReducer.js';

const MainPage = () => {
  const dispatch = useDispatch();
  const data = useSelector(selectors.selectAll);
  const messages = useSelector(selecrorsMessages.selectAll);
  const { currentChannelId } = useSelector((state) => state.channel);
  console.log(data, currentChannelId, messages, 'data');
  useEffect(() => {
    dispatch(fetchGetData());
  }, [dispatch]);
  return (
    <div>Main</div>
  );
};

export default MainPage;
