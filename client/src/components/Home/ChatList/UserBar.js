import { Box, Button, Grid, InputAdornment, Typography } from '@material-ui/core';
import { GroupAdd as GroupAddIcon, Search as SearchIcon } from '@material-ui/icons';
import React, { useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Avatar from '../Avatar';
import Menu from './Menu';
import { BorderTextField, useStyle } from './style';



const UserBar = ({ selectProfile, handleSearchTerm, hideYourScreen, searchTerm }) => {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
    const typingTimeoutRef = useRef(null);

    const history = useHistory();
    const dispatch = useDispatch();
    const classes = useStyle();


    const logout = () => {
        dispatch({ type: 'LOGOUT' });
        setUser(null);
        history.push('/');
    }
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
    }

    return (
        <div className={classes.userinfo}  >
            <Box my={4} width="75%">
                <Grid container direction="row" justify="flex-start" alignItems="center" spacing={2}>
                    <Grid item xs={3} >
                        <Avatar url={user.result.avatar} width={70} height={70} />
                    </Grid>
                    <Grid item xs={6} align="center" >
                        <Typography variant="h5"  >{`${user.result.lastname} ${user.result.firstname}`}</Typography>
                    </Grid>
                    <Grid item xs={3} >
                        <Menu logout={logout} selectProfile={selectProfile} hideYourScreen={hideYourScreen} />
                    </Grid>
                </Grid>
            </Box>
            <Box my={0} width="90%">
                <form >
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
                </form>
                <Box my={1} >
                    <Box width={1} my={2} >
                        <Grid container direction="row" justify="center" alignItems="center">
                            <Grid item xs={12} container direction="row" justify="center" alignItems="center" >
                                <Button variant="contained" size="medium" color="primary" startIcon={<GroupAddIcon fontSize="large" />} >
                                    Create group chat
                                </Button>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Box>
        </div>
    )
}

export default UserBar