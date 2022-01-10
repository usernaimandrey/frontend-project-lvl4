import ReactDOM from 'react-dom';
import React, { useState, useContext, useEffect } from 'react';
import {
  Button, Navbar, Container,
} from 'react-bootstrap';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Navigate,
  useLocation,
  useNavigate,
} from 'react-router-dom';
import Login from './components/Form/Login.jsx';
import MainPage from './components/MainPage/MainPage.jsx';
import PageNotFounf from './components/PageNotFound/PageNotFound.jsx';
import imgLabel from './picture/label.jpg';
// import useAuth from './hooks/useAuth.jsx';
import authContext from './context/index.jsx';

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

const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem('userId');
  const location = useLocation();
  return (
    token ? children : <Navigate to="/login" state={{ from: location }} />
  );
};

const AuthButton = () => {
  const auth = useContext(authContext);
  const location = useLocation();
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem('userId');
    if (token) {
      auth.logIn();
    } else {
      auth.logOut();
    }
  });
  const handler = () => {
    auth.logOut();
    navigate('/login', { from: location });
  };
  return (
    auth.logedIn
      ? <Button onClick={handler}>Выход</Button>
      : null
  );
};

const App = () => (
  <AuthProvider>
    <div className="d-flex flex-column h-100">
      <Router>
        <Navbar className="shadow-sm navbar navbar-expand-lg navbar-light bg-white">
          <Container fluid>
            <Navbar.Brand as={Link} to="/">
              <img src={imgLabel} alt="" width="30" height="30" className="d-inline-block align-text-top" />
              <strong>Hexlet Chart</strong>
            </Navbar.Brand>
            <AuthButton />
          </Container>
        </Navbar>
        <div className="container-fluid h-100">
          <Routes>
            <Route
              exact
              path="/"
              element={(
                <PrivateRoute>
                  <MainPage />
                </PrivateRoute>
              )}
            />
            <Route path="/login/" element={<Login />} />
            <Route path="/registration/" element={<MainPage />} />
            <Route path="*" element={<PageNotFounf />} />
          </Routes>
        </div>
      </Router>
    </div>
  </AuthProvider>
);

const container = document.getElementById('chat');

ReactDOM.render(
  <App />,
  container,
);

export default App;
