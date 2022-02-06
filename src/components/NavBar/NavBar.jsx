import React, { useContext, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
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
import authContext from '../../context/index.jsx';
import Login from '../Form/Login.jsx';
import MainPage from '../MainPage/MainPage.jsx';
import PageNotFounf from '../PageNotFound/PageNotFound.jsx';
import ToastNetworkErr from '../Toasts/ToastNetworkErr.jsx';
import imgLabel from '../../picture/label.png';
import RegistrationForm from '../Form/RegistrarionForm.jsx';

const PrivateRoute = ({ children }) => {
  const userId = JSON.parse(localStorage.getItem('userId'));
  const location = useLocation();
  return (
    userId && userId.token ? children : <Navigate to="/login" state={{ from: location }} />
  );
};

const AuthButton = () => {
  const { t } = useTranslation();
  const auth = useContext(authContext);
  const location = useLocation();
  const navigate = useNavigate();
  useEffect(() => {
    const userId = JSON.parse(localStorage.getItem('userId'));
    if (userId && userId.token) {
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
      ? <Button onClick={handler}>{t('navBar.button')}</Button>
      : null
  );
};

const NavBar = () => {
  const { t } = useTranslation();
  return (
    <div className="d-flex flex-column h-100 overflow-hidden">
      <Router>
        <Navbar className="shadow-sm navbar navbar-expand-lg navbar-light bg-white">
          <Container fluid>
            <Navbar.Brand as={Link} to="/">
              <img src={imgLabel} alt="" width="30" height="30" className="d-inline-block align-text-top" />
              <strong>{t('navBar.navBrand')}</strong>
            </Navbar.Brand>
            <AuthButton />
          </Container>
        </Navbar>
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
          <Route path="/signup/" element={<RegistrationForm />} />
          <Route path="*" element={<PageNotFounf header={t('pageNotFound.header')} />} />
        </Routes>
      </Router>
      <ToastNetworkErr />
    </div>
  );
};

export default NavBar;
