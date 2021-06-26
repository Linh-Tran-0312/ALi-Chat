import { Avatar, Box, Button, Container, Grid, Paper, Typography } from '@material-ui/core';
import FacebookIcon from '@material-ui/icons/Facebook';
import GoogleIcon from '@material-ui/icons/Google';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { signIn, signUp } from '../../actions/auth';
import Input from './Input';
import { makeStyles } from '@material-ui/core/styles';

const useStyles =  makeStyles((theme) => ({
    submit : {
       padding: theme.spacing(1),    
    },
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: theme.spacing(2),
      

    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(3),
    },
    avatar: {
        margin: theme.spacing(3),
        backgroundColor: theme.palette.secondary.main,
    },
    colorBlue: {
        color: '#20c5dd',
        fontStyle: 'italic'
    }

}))

const initialState = {
    lastname: '',
    firstname: '',
    email: '',
    password: '',
    confirm_password: ''
}
const Auth = () => {
    const [isSignUp, setIsSignUp] = useState(false);
    const [formData, setFormData] = useState(initialState);

  
    const classes = useStyles();
    const dispatch = useDispatch();
    const history = useHistory();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }
    const handleSwitchMode = () => {
        setIsSignUp(prevIsSignUp => !prevIsSignUp);
    }
    const handleSubmit = (e) => {
        e.preventDefault();

        if (isSignUp) {
            dispatch(signUp(formData, history));
        } else {
            dispatch(signIn(formData, history));
        }

    }
    return (
        <Container component="main" maxWidth="xs">
            <Paper className={classes.paper} elevation={3}>
                <Avatar src="/logoAli.png" style={{width: 80, height: 80}}/>              
                <Box py={1}>
                    <Typography variant="h5" className={classes.colorBlue}>{isSignUp ? 'Sign Up' : 'Welcome to ALi Chat'}</Typography>
                </Box>
                <form className={classes.form} onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        {isSignUp ? (
                            <>
                                <Input name="firstname" type="text" label="First Name" half={true} handleChange={handleChange} autoFocus />
                                <Input name="lastname" type="text" label="Last Name" half={true} handleChange={handleChange} />
                            </>
                        ) : null}

                        <Input name="email" type="email" label="Email" handleChange={handleChange} />
                        <Input name="password" type="password" label="Password" handleChange={handleChange} />
                        {isSignUp && (<Input name="confirm_password" type="password" label="Confirm Password" handleChange={handleChange} />
                        )}
                    </Grid>
                    <Box py={2}>
                        <Button type="submit" className={classes.submit} fullWidth variant="contained" color="primary">{isSignUp ? 'Sign Up' : 'Sign In'}</Button>
                    </Box>
                    { !isSignUp ? (
                        <>
                            <Box my={2}>
                                <Button className={classes.submit} fullWidth variant="contained" color="secondary"><GoogleIcon /> &nbsp; Login with Google</Button>
                            </Box>
                            <Button className={classes.submit} fullWidth variant="contained" color="primary"><FacebookIcon /> &nbsp; Login with Facebook</Button>
                        </>
                    ) : null }


                    <Box my={5} align="center">
                        <Button color="primary" onClick={handleSwitchMode}>{isSignUp ? "Already have an account? Sign In" : "Don't have an account, Sign Up"}</Button>
                    </Box>
                </form>
            </Paper>
        </Container>
    )
}

export default Auth;