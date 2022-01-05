import ReactDOM from 'react-dom';
import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
} from 'react-router-dom';
import Login from './components/Form/Login.jsx';
import MainPage from './components/MainPage/MainPage.jsx';
import PageNotFounf from './components/PageNotFound/PageNotFound.jsx';
import imgLabel from './picture/label.jpg';

const App = () => (
  <div className="d-flex flex-column h-100">
    <Router>
      <nav className="shadow-sm navbar navbar-expand-lg navbar-light bg-white">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/login">
            <img src={imgLabel} alt="" width="30" height="30" className="d-inline-block align-text-top" />
            <strong>Hexlet Chart</strong>
          </Link>
          <Link className="navbar-brand" to="/">Main</Link>
        </div>
      </nav>
      <div className="container-fluid h-100">
        <Routes>
          <Route exact path="/" element={<MainPage />} />
          <Route path="/login/" element={<Login />} />
          <Route path="/registration/" element={<MainPage />} />
          <Route path="*" element={<PageNotFounf />} />
        </Routes>
      </div>
    </Router>
  </div>
);

const container = document.getElementById('chat');

ReactDOM.render(
  <App />,
  container,
);

export default App;
