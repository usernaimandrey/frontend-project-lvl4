import ReactDOM from 'react-dom';
import React, { useState } from 'react';
import { Provider } from 'react-redux';
import { Provider as ProviderRollbar, ErrorBoundary, LEVEL_WARN } from '@rollbar/react';
import store from './slices/index.js';
import './i18n.js';
import authContext from './context/index.jsx';
import NavBar from './components/NavBar/NavBar.jsx';

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
const App = () => {
  const rollbarConfig = {
    accessToken: '2ed00c04002f46748e0ef17039c4b0a1',
    environment: 'production',
    enabled: process.env.NODE_ENV === 'production',
    captureUncaught: true,
    captureUnhandledRejections: true,
  };
  return (
    <ProviderRollbar config={rollbarConfig}>
      <ErrorBoundary level={LEVEL_WARN}>
        <AuthProvider>
          <NavBar />
        </AuthProvider>
      </ErrorBoundary>
    </ProviderRollbar>
  );
};

const container = document.getElementById('chat');
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  container,
);

export default App;
