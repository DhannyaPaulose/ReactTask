import React from 'react';
import {render} from 'react-dom';
import './assets/css/main.css';
// import App from './App';
import App from './components/App'
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';
import reducers from './reducers';
import * as serviceWorker from './serviceWorker';


const store = createStore(reducers, {}, applyMiddleware(reduxThunk));

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.querySelector('#root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
