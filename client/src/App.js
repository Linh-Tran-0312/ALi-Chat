import React, { useEffect } from 'react';
import { BrowserRouter as Router, Redirect, Route } from 'react-router-dom';
import Auth from './containers/AuthPage';
import Home from './containers/HomePage';
import { configSocket } from './socket';
 
const Chat = () => {

    useEffect(() => {
        configSocket();
    },[]);
    
    return (  <Route  path="/" component={Home}/> 
    )
}

const App = () => {
    return(
            <Router>
            <Route exact path="/login" component={Auth}/>         
            <Chat />
            </Router>
    )
}

export default App;