import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.css';
import App from './components/app/App';
import registerServiceWorker from './registerServiceWorker';
import env from "./environment"

console.log(env)

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
