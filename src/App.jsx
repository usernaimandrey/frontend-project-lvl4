import ReactDOM from 'react-dom';
import React, { useState } from 'react';
import { Provider } from 'react-redux';
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
const App = () => (
  <AuthProvider>
    <NavBar />
  </AuthProvider>
);

const container = document.getElementById('chat');

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  container,
);

export default App;
