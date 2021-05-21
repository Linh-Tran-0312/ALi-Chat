import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import {SocketContext, socket} from './context.socket';
import Auth from './components/Auth/Auth';
import Home from './components/Home/Home';


const App = () => {
    return(
        <SocketContext.Provider value={socket}>
            <Router>
            <Route exact path="/" component={Auth}/>         
            <Route  path="/chat" component={Home}/>
            </Router>
        </SocketContext.Provider>
    )
}

export default App;