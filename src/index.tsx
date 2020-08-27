import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App/App';
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import {todoapp} from './redux/todoapp';

// @ts-ignore
const store = createStore(todoapp,   window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

ReactDOM.render(
    (
        <React.StrictMode>
            <Provider store={store}>
                <App />
            </Provider>
        </React.StrictMode>
    )
  ,
  document.getElementById('root')
);

