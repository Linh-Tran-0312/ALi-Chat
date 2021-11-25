import { makeStyles } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, useHistory } from 'react-router';
import { loadProfile } from '../../actions/auth';
import { changeScreen } from '../../actions/layout';
import getSocket from '../../socket';
import AppWall from './AppIntro/AppWall';
import ChatFeed from './ChatFeed/ChatFeed';
import ChatInfo from './ChatInfo/ChatInfo';
import ChatList from './ChatList/ChatList';
import { emitGetConversations, emitJoinRoomUserId } from './socket';
const useStyle = makeStyles(() => ({
    container: {
        width: '100%',
        height: '100vh',
        display: 'flex',
        flexDirection: 'row',
    }
}));

const Home = () => {

    const matchLG = useMediaQuery('(min-width:1101px)');
    const matchMD = useMediaQuery('(max-width:1100px)');
    const matchSM = useMediaQuery('(max-width:900px)');
    const matchXS = useMediaQuery('(max-width:640px)');

    //const currentProfile = useSelector(state => state.auth).currentProfile;
    const user = JSON.parse(localStorage.getItem('profile'))?.result;

    const [searchTerm, setSearchTerm] = useState("");

    const { view } = useSelector(state => state.layout);
    const classes = useStyle();
    const dispatch = useDispatch();
    const history = useHistory();

 /*    useEffect(() => {
        if(user?.id !== currentProfile?.id)
        {
            history.push("/")
        }
    }, [currentProfile?.id]);

    function storageEventHandler() {
 }
        */
   
    useEffect(() => {
        if(getSocket().disconnected) {
            getSocket().connect();
        }
    },[user]);

    useEffect(() => {
       dispatch(loadProfile(user))
    }, [user]); 
 
    useEffect(() => {
         emitGetConversations(user?._id)
    }, [user]);
   
    useEffect(() => {
        emitJoinRoomUserId(user?._id);
    }, [user]);

    useEffect(() => { 
        if(matchLG) dispatch(changeScreen('LG'));
        if(matchMD) dispatch(changeScreen('MD'));
        if(matchSM) dispatch(changeScreen('SM'));
        if(matchXS) dispatch(changeScreen('XS'));
    },[matchMD,matchSM ,matchXS, matchLG]);

    if(user)
    return (

       
        <div className={classes.container}>
            {
                view.CHATLIST && <ChatList searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
            }  
            {
                view.INTRO &&   <AppWall />
            }       
            {             
                view.CHATFEED &&  <ChatFeed setSearchTerm={setSearchTerm} />
            }
            {
                view.CHATINFO && <ChatInfo />
            }           
        </div>

    )
    return  <Redirect to="/login" />
}

export default Home;