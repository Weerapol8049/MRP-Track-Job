import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { createStore, applyMiddleware } from 'redux';
import reducers from './reducers';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import logger from 'redux-logger';
import { BrowserRouter } from "react-router-dom";

//var middlewares = (middlewares = applyMiddleware(thunk, logger));

//const store = createStore(reducers, middlewares);

//const baseUrl = document.getElementsByTagName('base')[0].getAttribute('href');

//ReactDOM.render(<BrowserRouter basename={baseUrl}> <App /> </BrowserRouter>, document.getElementById('root'));
ReactDOM.render(<App /> , document.getElementById('root'));

// ReactDOM.render(
// 	<React.StrictMode>
// 		<Provider store={store}>
// 			<App />
// 		</Provider>
// 	</React.StrictMode>,
// 	document.getElementById('root')
// );

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
