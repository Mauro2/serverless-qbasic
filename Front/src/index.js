import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import PrimeNumbers from './PrimeNumber';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(<PrimeNumbers />, document.getElementById('root'));

serviceWorker.unregister();
