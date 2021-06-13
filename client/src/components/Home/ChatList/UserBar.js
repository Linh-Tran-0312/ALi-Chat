import { Box, Grid, InputAdornment, TextField, Typography } from '@material-ui/core';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import { Search as SearchIcon } from '@material-ui/icons';
import React, { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Avatar from '../Avatar';
import Menu from './Menu';
import ModalCreateGroup from './ModalCreateGroup/ModalCreateGroup';


  const useStyles = makeStyles((theme) => ({
   userinfo : {
    width: '100%',
    height: '250px',
    backgroundColor: '#edf4ff',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
   },
   input: {
    background: "white",
    borderRadius: 20,
  },
  inputStyle : { 
    "&:-webkit-autofill": {
    WebkitBoxShadow: "0 0 0 1000px white inset"
  } }
}));
 

const BorderTextField = withStyles({
    root: {
      '& .MuiOutlinedInput-root': {
        '& fieldset': {
          borderRadius: `20px`,
         
        },
   
      }
    }
  })(TextField);

const UserBar = ({ handleSearchTerm }) => {
    const  user  = useSelector(state => state.user);

    const typingTimeoutRef = useRef(null);

    const history = useHistory();
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
    }
    
 
    return (
        <div className={classes.userinfo}  >
            <Box my={4} width="75%">
                <Grid container direction="row" justify="flex-start" alignItems="center" spacing={2}>
                    <Grid item xs={3} >
                        <Avatar url={user.avatar} width={70} height={70} />
                    </Grid>
                    <Grid item xs={6} align="center" >
                        <Typography variant="h5"  >{`${user.lastname} ${user.firstname}`}</Typography>
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