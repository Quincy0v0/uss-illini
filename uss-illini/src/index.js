import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import InfoIndex from './ShipsInfo/InfoIndex.js'
import Graph from './Graph/Graph.js'
import Simulator from './Simulator/Simulator.js'

ReactDOM.render((
    <Router>
        <div>
            <Route exact path="/" component={App}/>
            <Route path="/Info" component={InfoIndex}/>
            <Route path="/Player" component={Graph}/>
            <Route path="/Sim" component={Simulator}/>
        </div>
    </Router>
    ),
    document.getElementById('root')
);
registerServiceWorker();
