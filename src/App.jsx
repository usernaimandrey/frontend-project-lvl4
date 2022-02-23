import React, { useState } from 'react';
import { io } from 'socket.io-client';
import { Provider } from 'react-redux';
import { Provider as ProviderRollbar, ErrorBoundary, LEVEL_WARN } from '@rollbar/react';
import store from './slices/index.js';
import './i18n.js';
import authContext, { socketContext } from './context/index.jsx';
import NavBar from './components/NavBar/NavBar.jsx';
import { addNewMessages } from './slices/messagesReducer.js';
import { addChannel, removeChannel, renameChannel } from './slices/chennelReducer.js';

const AuthProvider = ({ children }) => {
  const [logedIn, setLogin] = useState(false);
  const logIn = () => setLogin(true);
  const logOut = () => {
    localStorage.removeItem('userId');
    setLogin(false);
  };

  return (
    <authContext.Provider value={{ logIn, logOut, logedIn }}>
      {children}
    </authContext.Provider>
  );
};
const App = ({ socket }) => {
  const rollbarConfig = {
    accessToken: process.env.ROLLBAR_ACCESS_TOCKEN,
    environment: 'production',
    enabled: process.env.NODE_ENV === 'production',
    captureUncaught: true,
    captureUnhandledRejections: true,
  };
  return (
    <ProviderRollbar config={rollbarConfig}>
      <ErrorBoundary level={LEVEL_WARN}>
        <AuthProvider>
          <socketContext.Provider value={socket}>
            <NavBar />
          </socketContext.Provider>
        </AuthProvider>
      </ErrorBoundary>
    </ProviderRollbar>
  );
};

const init = async (socketClient = io()) => {
  const socket = socketClient;
  socket.on('newMessage', (msg) => {
    store.dispatch(addNewMessages({ msg }));
  });
  socket.on('newChannel', (channel) => {
    store.dispatch(addChannel({ channel }));
  });
  socket.on('removeChannel', ({ id }) => {
    store.dispatch(removeChannel({ id }));
  });
  socket.on('renameChannel', (channel) => {
    store.dispatch(renameChannel({
      id: channel.id,
      changes: {
        name: channel.name,
      },
    }));
  });
  return (
    <Provider store={store}>
      <App socket={socket} />
    </Provider>
  );
};

export default init;
