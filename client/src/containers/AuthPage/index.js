import { Avatar, Box, Button, Container, Grid, Paper, Typography } from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';
import FacebookIcon from '@material-ui/icons/Facebook';
import GoogleIcon from '@material-ui/icons/Google';
import { FacebookLogin } from 'facebook-login-react';
import React, { useEffect, useState } from 'react';
import { GoogleLogin } from 'react-google-login';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { clearErrorMessage, signIn, signInWithFacebook, signInWithGoogle, signUp, socialLoginError, passwordLengthInvalid } from '../../actions/auth';
import Input from './Input';

const useStyles = makeStyles((theme) => ({
    submit: {
        padding: theme.spacing(1),
        color: 'white',
        fontWeight: 'bold'
    },
    google: {
        width: '100%',
        margin: '0 auto',
        backgroundColor: '#dd4437',
        color: 'white',
    },
    facebook: {
        width: '100%',
        margin: '0 auto',
    },
    paper: {
        marginTop: '20px',
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
    },
    colorRed: {
        color: '#d44f4f',
    },
    or: {
        width: '100%',
        textAlign: 'center',
        borderBottom: ' 1px solid #b0b0b0',
        lineHeight: '0.1em',
        '& span': {
            background: '#fff',
            margin: '10px 5px',
            color: '#a1a1a1'
        }
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
    const [isSigningIn, setIsSigningIn] = useState(false);
    const { loginError: errorMessage } = useSelector(state => state.error)

    const classes = useStyles();
    const dispatch = useDispatch();
    const history = useHistory();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }
    const handleSwitchMode = () => {
        dispatch(clearErrorMessage());
        setIsSignUp(prevIsSignUp => !prevIsSignUp);
    }
    const handleSubmit = (e) => {
        dispatch(clearErrorMessage());
        e.preventDefault();
       
        if (isSignUp) {
            if(formData.password.length < 6 || formData.confirm_password.length < 6) {
                dispatch(passwordLengthInvalid())
            } else {
                dispatch(signUp(formData, history));
                setIsSigningIn(true);
            }
        } else {
            dispatch(signIn(formData, history));
            setIsSigningIn(true);
        }
    }

    const responseFacebook = (res) => {
        try {
            dispatch(signInWithFacebook(res.accessToken, history))
        } catch (error) {
            console.log(error);
            dispatch(socialLoginError('Facebook Sign In was unsuccessful. Try again later'))
        }
    }

    const googleSuccess = async (res) => {
        const tokenId = res?.tokenId;
        try {
            dispatch(signInWithGoogle(tokenId, history))
        } catch (error) {
            console.log(error);
        }
    }

    const googleFailure = (res) => {
        console.log(res.error);
        dispatch(socialLoginError('Google Sign In was unsuccessful. Try again later'))
    }

    useEffect(() => {
        setIsSigningIn(false);
    }, [errorMessage]);

    return (
        <Container component="main" maxWidth="xs">
            <Paper className={classes.paper} elevation={3}>
                <Avatar src="/logoAli.png" style={{ width: 80, height: 80 }} />
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
                    <Box my={1} ml={1}>
                        <Typography variant="subtitle2" className={classes.colorRed}>{errorMessage}</Typography>
                    </Box>
                    <Box py={2} textAlign="center" >
                        {
                            <Button type="submit" className={classes.submit} fullWidth variant="contained" style={{ backgroundColor: '#71a8db' }}>{isSigningIn ? <CircularProgress size="25px" style={{ color: 'white' }} /> : isSignUp ? 'Sign Up' : 'Sign In'}</Button>
                        }
                    </Box>
                    {!isSignUp ? (
                        <Box mt={1} textAlign="center">
                            <Box my={2}>
                                <Typography className={classes.or} ><span>&nbsp;OR&nbsp;</span></Typography>
                            </Box>
                            <Grid container spacing={2}>
                                <Grid item md={6} lg={6} sm={6} xs={6}>
                                    <GoogleLogin
                                        clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
                                        render={(renderProps) => (
                                            <Button
                                                className={classes.google}
                                                variant="contained"
                                                startIcon={<GoogleIcon />}
                                                onClick={renderProps.onClick}
                                                disabled={renderProps.disabled}
                                            >
                                                Google
                                            </Button>
                                        )}
                                        onSuccess={googleSuccess}
                                        onFailure={googleFailure}
                                        cookiePolicy="single_host_origin"
                                    />
                                </Grid>
                                <Grid item md={6} lg={6} sm={6} xs={6}>
                                    <FacebookLogin
                                        appId={process.env.REACT_APP_FACEBOOK_APP_ID}
                                        fields="name,email,picture,first_name,last_name"
                                        callback={responseFacebook}
                                        render={renderProps => (
                                            <Button className={classes.facebook} variant="contained" color="primary" onClick={renderProps.onClick} startIcon={<FacebookIcon />}>Facebook</Button>
                                        )}
                                    />
                                </Grid>
                            </Grid>
                        </Box>

                    ) : null}
                    <Box my={5} align="center">
                        <Button color="primary" onClick={handleSwitchMode}>{isSignUp ? "Already have an account? Sign In" : "Don't have an account, Sign Up"}</Button>
                    </Box>
                </form>
            </Paper>
        </Container>
    )
}

export default Auth;