import { Box, Grid, InputAdornment, TextField, Typography, Button, IconButton, useMediaQuery } from '@material-ui/core';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import { Search as SearchIcon, DoubleArrow, ArrowForward, ArrowBack, ViewList } from '@material-ui/icons';
import SpeakerNotesIcon from '@material-ui/icons/SpeakerNotes';
import React, { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Avatar from '../Avatar';
import Menu from './Menu';
import ModalCreateGroup from './ModalCreateGroup/ModalCreateGroup';
import { changeMode } from '../../../actions/layout';


const useStyles = makeStyles((theme) => ({
    userinfo: {
        width: '100%',
        height: '250px',
        backgroundColor: 'white',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    input: {
        background: "white",
        borderRadius: 20,
    },
    inputStyle: {
        "&:-webkit-autofill": {
            WebkitBoxShadow: "0 0 0 1000px white inset"
        }
    },
    center : {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    }
}));


const BorderTextField = withStyles({
    root: {
        '& .MuiOutlinedInput-root': {
            '& fieldset': {
                borderRadius: `20px`,
                marginLeft: '5px'
            },
        }
    }
})(TextField);

const UserBar = ({ handleSearchTerm }) => {
     const { mode, screen } = useSelector(state => state.layout);
    /* const match900 = useMediaQuery('(max-width: 900px)'); */
    const user = useSelector(state => state.user);

    const typingTimeoutRef = useRef(null);
    const dispatch = useDispatch();
    const classes = useStyles();

    const handleChange = (e) => {
        const value = e.target.value
        if (typingTimeoutRef.current) {
            clearTimeout(typingTimeoutRef.current);
        }
        typingTimeoutRef.current = setTimeout(() => {
            const formData = {
                searchTerm: value
            };
            handleSearchTerm(formData);
        }, 500);
    };

    const handleOpenChatList = () => {
        dispatch(changeMode('MD'));
    } ;

    const handleCloseChatList = () => {
        dispatch(changeMode('SM'));
    } 

     if(mode === 'SM') {
         return(
             <div className={classes.userinfo}>
                 <Box my={2}><Avatar url={user?.avatar} size={70} /></Box>
                 <Box my={2}><Menu /></Box>
                 <Box my={2}><Button onClick={handleOpenChatList}><ArrowForward /></Button></Box>                
             </div>
         )
     }
    return (
        <div className={classes.userinfo}  >
            <Box my={4} width="75%">
                <Grid container direction="row" justify="flex-start" alignItems="center" spacing={2}>
                    <Grid item xs={3} >
                        <Avatar url={user?.avatar} size={70} />
                    </Grid>
                    <Grid item xs={6} align="center" >
                        <Typography variant="h5"  >{`${user?.lastname} ${user?.firstname}`}</Typography>
                    </Grid>
                    <Grid item xs={3} >
                        <Menu />
                    </Grid>
                </Grid>
            </Box>
            <Box my={0} width="90%" >
                <Box className={classes.center}>
                <ViewList fontSize="large" style={{color: '#71a8db'}} />
                <BorderTextField
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <SearchIcon />
                            </InputAdornment>
                        ), className: classes.input
                    }}
                    inputProps={{ className: classes.inputStyle }}
                    placeholder="Search Friends"
                    type="text"
                    variant="outlined"
                    size="small"
                    style={{ width: '100%' }}
                    onChange={handleChange}
                    name="searchTerm"
                />
                   
                </Box>
               
                <Box my={1} >
                    <Box width={1} my={2} >
                        <Box className={classes.center}>
                        {
                    screen === 'SM' && ( <Button onClick={handleCloseChatList}><ArrowBack /></Button>)
                }
                                <ModalCreateGroup />
                           
                        </Box>
                    </Box>
                </Box>
            
               
            </Box>
        </div>
    )
}

export default UserBar