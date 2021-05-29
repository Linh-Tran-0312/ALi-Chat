import { Box, Button, Grid, InputAdornment, Typography, Modal } from '@material-ui/core';
import { GroupAdd as GroupAddIcon, Search as SearchIcon } from '@material-ui/icons';
import React, { useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Avatar from '../Avatar';
import Menu from './Menu';
import ModalCreateGroup from './ModalCreateGroup/ModalCreateGroup';
import { BorderTextField, useStyle } from './style';



const UserBar = ({ handleSearchTerm, searchTerm }) => {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
    
    const typingTimeoutRef = useRef(null);

    const history = useHistory();
    const dispatch = useDispatch();
    const classes = useStyle();

 
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
                        <Menu />
                    </Grid>
                </Grid>
            </Box>
            <Box my={0} width="90%">
               
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
               
                <Box my={1} >
                    <Box width={1} my={2} >
                        <Grid container direction="row" justify="center" alignItems="center">
                            <Grid item xs={12} container direction="row" justify="center" alignItems="center" >
                             <ModalCreateGroup />
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Box>
        </div>
    )
}

export default UserBar