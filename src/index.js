import React from 'react';
import { render } from 'react-dom';
import './styles/index.css';

import { createStore } from 'redux'
import { Provider } from 'react-redux'
import App from './containers/app/App'
import rootReducer from './reducers'
import env from "./environment"

console.log(env)


const store = createStore(rootReducer)

render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
)
