// @ts-check
import ReactDOM from 'react-dom';
import 'core-js/stable/index.js';
import 'regenerator-runtime/runtime.js';

import '../assets/application.scss';
import init from './App.jsx';

if (process.env.NODE_ENV !== 'production') {
  localStorage.debug = 'chat:*';
}

const render = async () => {
  const vDom = await init();
  ReactDOM.render(
    vDom, document.getElementById('chat'),
  );
};

render();
