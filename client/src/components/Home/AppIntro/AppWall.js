import { Box, Button, Grid, Typography } from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';
import PersonIcon from '@material-ui/icons/Person';
import PhotoCameraIcon from '@material-ui/icons/PhotoCamera';
import TelegramIcon from '@material-ui/icons/Telegram';
import VisibilityIcon from '@material-ui/icons/Visibility';
import Radium, { StyleRoot } from 'radium';
import React, { useEffect, useRef, useState } from 'react';
import { slideInUp, tada } from 'react-animations';
import { useDispatch } from 'react-redux';
import { updateAvatar } from '../../../actions/user';
import ModalUpdateProfile from './ModalUpdateProfile';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    userinfo: {
        height: 'calc(100vh - 70px)',
        width: '75%',
        backgroundColor: "#82e8ff",
        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100%25'%3E%3Cdefs%3E%3ClinearGradient id='a' gradientUnits='userSpaceOnUse' x1='0' x2='0' y1='0' y2='100%25' gradientTransform='rotate(240)'%3E%3Cstop offset='0' stop-color='%2382e8ff'/%3E%3Cstop offset='1' stop-color='%23e3ffed'/%3E%3C/linearGradient%3E%3Cpattern patternUnits='userSpaceOnUse' id='b' width='540' height='450' x='0' y='0' viewBox='0 0 1080 900'%3E%3Cg fill-opacity='0.1'%3E%3Cpolygon fill='%23444' points='90 150 0 300 180 300'/%3E%3Cpolygon points='90 150 180 0 0 0'/%3E%3Cpolygon fill='%23AAA' points='270 150 360 0 180 0'/%3E%3Cpolygon fill='%23DDD' points='450 150 360 300 540 300'/%3E%3Cpolygon fill='%23999' points='450 150 540 0 360 0'/%3E%3Cpolygon points='630 150 540 300 720 300'/%3E%3Cpolygon fill='%23DDD' points='630 150 720 0 540 0'/%3E%3Cpolygon fill='%23444' points='810 150 720 300 900 300'/%3E%3Cpolygon fill='%23FFF' points='810 150 900 0 720 0'/%3E%3Cpolygon fill='%23DDD' points='990 150 900 300 1080 300'/%3E%3Cpolygon fill='%23444' points='990 150 1080 0 900 0'/%3E%3Cpolygon fill='%23DDD' points='90 450 0 600 180 600'/%3E%3Cpolygon points='90 450 180 300 0 300'/%3E%3Cpolygon fill='%23666' points='270 450 180 600 360 600'/%3E%3Cpolygon fill='%23AAA' points='270 450 360 300 180 300'/%3E%3Cpolygon fill='%23DDD' points='450 450 360 600 540 600'/%3E%3Cpolygon fill='%23999' points='450 450 540 300 360 300'/%3E%3Cpolygon fill='%23999' points='630 450 540 600 720 600'/%3E%3Cpolygon fill='%23FFF' points='630 450 720 300 540 300'/%3E%3Cpolygon points='810 450 720 600 900 600'/%3E%3Cpolygon fill='%23DDD' points='810 450 900 300 720 300'/%3E%3Cpolygon fill='%23AAA' points='990 450 900 600 1080 600'/%3E%3Cpolygon fill='%23444' points='990 450 1080 300 900 300'/%3E%3Cpolygon fill='%23222' points='90 750 0 900 180 900'/%3E%3Cpolygon points='270 750 180 900 360 900'/%3E%3Cpolygon fill='%23DDD' points='270 750 360 600 180 600'/%3E%3Cpolygon points='450 750 540 600 360 600'/%3E%3Cpolygon points='630 750 540 900 720 900'/%3E%3Cpolygon fill='%23444' points='630 750 720 600 540 600'/%3E%3Cpolygon fill='%23AAA' points='810 750 720 900 900 900'/%3E%3Cpolygon fill='%23666' points='810 750 900 600 720 600'/%3E%3Cpolygon fill='%23999' points='990 750 900 900 1080 900'/%3E%3Cpolygon fill='%23999' points='180 0 90 150 270 150'/%3E%3Cpolygon fill='%23444' points='360 0 270 150 450 150'/%3E%3Cpolygon fill='%23FFF' points='540 0 450 150 630 150'/%3E%3Cpolygon points='900 0 810 150 990 150'/%3E%3Cpolygon fill='%23222' points='0 300 -90 450 90 450'/%3E%3Cpolygon fill='%23FFF' points='0 300 90 150 -90 150'/%3E%3Cpolygon fill='%23FFF' points='180 300 90 450 270 450'/%3E%3Cpolygon fill='%23666' points='180 300 270 150 90 150'/%3E%3Cpolygon fill='%23222' points='360 300 270 450 450 450'/%3E%3Cpolygon fill='%23FFF' points='360 300 450 150 270 150'/%3E%3Cpolygon fill='%23444' points='540 300 450 450 630 450'/%3E%3Cpolygon fill='%23222' points='540 300 630 150 450 150'/%3E%3Cpolygon fill='%23AAA' points='720 300 630 450 810 450'/%3E%3Cpolygon fill='%23666' points='720 300 810 150 630 150'/%3E%3Cpolygon fill='%23FFF' points='900 300 810 450 990 450'/%3E%3Cpolygon fill='%23999' points='900 300 990 150 810 150'/%3E%3Cpolygon points='0 600 -90 750 90 750'/%3E%3Cpolygon fill='%23666' points='0 600 90 450 -90 450'/%3E%3Cpolygon fill='%23AAA' points='180 600 90 750 270 750'/%3E%3Cpolygon fill='%23444' points='180 600 270 450 90 450'/%3E%3Cpolygon fill='%23444' points='360 600 270 750 450 750'/%3E%3Cpolygon fill='%23999' points='360 600 450 450 270 450'/%3E%3Cpolygon fill='%23666' points='540 600 630 450 450 450'/%3E%3Cpolygon fill='%23222' points='720 600 630 750 810 750'/%3E%3Cpolygon fill='%23FFF' points='900 600 810 750 990 750'/%3E%3Cpolygon fill='%23222' points='900 600 990 450 810 450'/%3E%3Cpolygon fill='%23DDD' points='0 900 90 750 -90 750'/%3E%3Cpolygon fill='%23444' points='180 900 270 750 90 750'/%3E%3Cpolygon fill='%23FFF' points='360 900 450 750 270 750'/%3E%3Cpolygon fill='%23AAA' points='540 900 630 750 450 750'/%3E%3Cpolygon fill='%23FFF' points='720 900 810 750 630 750'/%3E%3Cpolygon fill='%23222' points='900 900 990 750 810 750'/%3E%3Cpolygon fill='%23222' points='1080 300 990 450 1170 450'/%3E%3Cpolygon fill='%23FFF' points='1080 300 1170 150 990 150'/%3E%3Cpolygon points='1080 600 990 750 1170 750'/%3E%3Cpolygon fill='%23666' points='1080 600 1170 450 990 450'/%3E%3Cpolygon fill='%23DDD' points='1080 900 1170 750 990 750'/%3E%3C/g%3E%3C/pattern%3E%3C/defs%3E%3Crect x='0' y='0' fill='url(%23a)' width='100%25' height='100%25'/%3E%3Crect x='0' y='0' fill='url(%23b)' width='100%25' height='100%25'/%3E%3C/svg%3E")`,
        backgroundAttachment: 'fixed',
        backgroundSize: 'cover',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',

    },
    userframe: {
        boxSizing: 'border-box',
        width: '80%',
     
        backgroundColor: 'rgba(0,0,0, 0.4)',
        borderRadius: 10,
        color: 'white',
        padding: 30
    },
    title: {
        width: '100%',
        color: 'white',
    },
    details : {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
       
    },
    img_container: {
        position: 'relative',
        top: 0,
        left: 0,
        width: '100%',
        marginBottom: 20,
        '&:hover $button_container' : {
            visibility: 'visible',
            zIndex: 10,
        }        
    },
    img: {     
        position: 'absolute',
        borderRadius:  10,
        width: 200,
        height: 200,
        left: 0,
        right: 0,
        objectFit: 'cover',
        border: '5px white solid',
        margin: 'auto',
     
        
    },
    button_container : {
        position: 'absolute',
        margin: 'auto',
        left: 0,
        right: 0,
        top: 150,
        width: 200,
        height: 55,
        backgroundColor: 'rgba(0,0,0, 0.5)',
        color: 'white',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        visibility: 'hidden',
        transition: 'opacity .35s ease'
    }, 
    button : {
        cursor: 'pointer',
        height: 30
    },
    loading: {
        position: 'absolute',
        margin: 'auto',
        left: 0,
        right: 0,
        top: 80,
        width: 200,
        height: 55,
        textAlign: 'center'
    },
    appintro: {
        height: '100vh',
        width: '75%',
        backgroundColor: "#82e8ff",
        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100%25'%3E%3Cdefs%3E%3ClinearGradient id='a' gradientUnits='userSpaceOnUse' x1='0' x2='0' y1='0' y2='100%25' gradientTransform='rotate(240)'%3E%3Cstop offset='0' stop-color='%2382e8ff'/%3E%3Cstop offset='1' stop-color='%23e3ffed'/%3E%3C/linearGradient%3E%3Cpattern patternUnits='userSpaceOnUse' id='b' width='540' height='450' x='0' y='0' viewBox='0 0 1080 900'%3E%3Cg fill-opacity='0.1'%3E%3Cpolygon fill='%23444' points='90 150 0 300 180 300'/%3E%3Cpolygon points='90 150 180 0 0 0'/%3E%3Cpolygon fill='%23AAA' points='270 150 360 0 180 0'/%3E%3Cpolygon fill='%23DDD' points='450 150 360 300 540 300'/%3E%3Cpolygon fill='%23999' points='450 150 540 0 360 0'/%3E%3Cpolygon points='630 150 540 300 720 300'/%3E%3Cpolygon fill='%23DDD' points='630 150 720 0 540 0'/%3E%3Cpolygon fill='%23444' points='810 150 720 300 900 300'/%3E%3Cpolygon fill='%23FFF' points='810 150 900 0 720 0'/%3E%3Cpolygon fill='%23DDD' points='990 150 900 300 1080 300'/%3E%3Cpolygon fill='%23444' points='990 150 1080 0 900 0'/%3E%3Cpolygon fill='%23DDD' points='90 450 0 600 180 600'/%3E%3Cpolygon points='90 450 180 300 0 300'/%3E%3Cpolygon fill='%23666' points='270 450 180 600 360 600'/%3E%3Cpolygon fill='%23AAA' points='270 450 360 300 180 300'/%3E%3Cpolygon fill='%23DDD' points='450 450 360 600 540 600'/%3E%3Cpolygon fill='%23999' points='450 450 540 300 360 300'/%3E%3Cpolygon fill='%23999' points='630 450 540 600 720 600'/%3E%3Cpolygon fill='%23FFF' points='630 450 720 300 540 300'/%3E%3Cpolygon points='810 450 720 600 900 600'/%3E%3Cpolygon fill='%23DDD' points='810 450 900 300 720 300'/%3E%3Cpolygon fill='%23AAA' points='990 450 900 600 1080 600'/%3E%3Cpolygon fill='%23444' points='990 450 1080 300 900 300'/%3E%3Cpolygon fill='%23222' points='90 750 0 900 180 900'/%3E%3Cpolygon points='270 750 180 900 360 900'/%3E%3Cpolygon fill='%23DDD' points='270 750 360 600 180 600'/%3E%3Cpolygon points='450 750 540 600 360 600'/%3E%3Cpolygon points='630 750 540 900 720 900'/%3E%3Cpolygon fill='%23444' points='630 750 720 600 540 600'/%3E%3Cpolygon fill='%23AAA' points='810 750 720 900 900 900'/%3E%3Cpolygon fill='%23666' points='810 750 900 600 720 600'/%3E%3Cpolygon fill='%23999' points='990 750 900 900 1080 900'/%3E%3Cpolygon fill='%23999' points='180 0 90 150 270 150'/%3E%3Cpolygon fill='%23444' points='360 0 270 150 450 150'/%3E%3Cpolygon fill='%23FFF' points='540 0 450 150 630 150'/%3E%3Cpolygon points='900 0 810 150 990 150'/%3E%3Cpolygon fill='%23222' points='0 300 -90 450 90 450'/%3E%3Cpolygon fill='%23FFF' points='0 300 90 150 -90 150'/%3E%3Cpolygon fill='%23FFF' points='180 300 90 450 270 450'/%3E%3Cpolygon fill='%23666' points='180 300 270 150 90 150'/%3E%3Cpolygon fill='%23222' points='360 300 270 450 450 450'/%3E%3Cpolygon fill='%23FFF' points='360 300 450 150 270 150'/%3E%3Cpolygon fill='%23444' points='540 300 450 450 630 450'/%3E%3Cpolygon fill='%23222' points='540 300 630 150 450 150'/%3E%3Cpolygon fill='%23AAA' points='720 300 630 450 810 450'/%3E%3Cpolygon fill='%23666' points='720 300 810 150 630 150'/%3E%3Cpolygon fill='%23FFF' points='900 300 810 450 990 450'/%3E%3Cpolygon fill='%23999' points='900 300 990 150 810 150'/%3E%3Cpolygon points='0 600 -90 750 90 750'/%3E%3Cpolygon fill='%23666' points='0 600 90 450 -90 450'/%3E%3Cpolygon fill='%23AAA' points='180 600 90 750 270 750'/%3E%3Cpolygon fill='%23444' points='180 600 270 450 90 450'/%3E%3Cpolygon fill='%23444' points='360 600 270 750 450 750'/%3E%3Cpolygon fill='%23999' points='360 600 450 450 270 450'/%3E%3Cpolygon fill='%23666' points='540 600 630 450 450 450'/%3E%3Cpolygon fill='%23222' points='720 600 630 750 810 750'/%3E%3Cpolygon fill='%23FFF' points='900 600 810 750 990 750'/%3E%3Cpolygon fill='%23222' points='900 600 990 450 810 450'/%3E%3Cpolygon fill='%23DDD' points='0 900 90 750 -90 750'/%3E%3Cpolygon fill='%23444' points='180 900 270 750 90 750'/%3E%3Cpolygon fill='%23FFF' points='360 900 450 750 270 750'/%3E%3Cpolygon fill='%23AAA' points='540 900 630 750 450 750'/%3E%3Cpolygon fill='%23FFF' points='720 900 810 750 630 750'/%3E%3Cpolygon fill='%23222' points='900 900 990 750 810 750'/%3E%3Cpolygon fill='%23222' points='1080 300 990 450 1170 450'/%3E%3Cpolygon fill='%23FFF' points='1080 300 1170 150 990 150'/%3E%3Cpolygon points='1080 600 990 750 1170 750'/%3E%3Cpolygon fill='%23666' points='1080 600 1170 450 990 450'/%3E%3Cpolygon fill='%23DDD' points='1080 900 1170 750 990 750'/%3E%3C/g%3E%3C/pattern%3E%3C/defs%3E%3Crect x='0' y='0' fill='url(%23a)' width='100%25' height='100%25'/%3E%3Crect x='0' y='0' fill='url(%23b)' width='100%25' height='100%25'/%3E%3C/svg%3E")`,
        backgroundAttachment: 'fixed',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'flex-end',
       
    },
    banner_container: {
        backgroundColor:'rgba(0,0,0,0.1)',
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    circle_container : {
        backgroundColor:'rgba(255,255,255,0.7)',
        width: '80vh',
        height: '80%',
        borderRadius: '50%',
        marginBottom: 20,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    gendericon : {
        position: 'relative',
        top: 6
    },
    media1 : {
        width: 80,
        position: 'relative',
        bottom: 110,
        left: 210       
    },
    media2 : {
        width: 80,
        position: 'relative',
        bottom: 480,
        left: 40       
    },
    media3 : {
        width: 60,
        position: 'relative',
        top: 510,
               
    },
    media4 : {
        width: 80,
        position: 'relative',
        top: 200,
        right: 220       
    }

}));

const styles = {
    tada: {
        animation: 'x 1.5s',
        animationName: Radium.keyframes(tada, 'tada')
    },
    slideInUp: {
        animation: 'x 2s',
        animationName: Radium.keyframes(slideInUp, 'slideInUp')
    }
}


const AppWall = ({ profile }) => {

    const user = JSON.parse(localStorage.getItem('profile')).result
    const [ isUpdatingAva, setIsUpdatingAva ] = useState(false);

    const classes = useStyles();
    const dispatch = useDispatch();
    const formRef = useRef(); 

    const handleSubmitAvatar = (e) => {
        e.preventDefault();
        console.log("da toi on submmit")
        const formData = new FormData(e.currentTarget);
        setIsUpdatingAva(true);
        dispatch(updateAvatar(formData))
    }
    
    const handleChangeAvatar = () => formRef.current['submit'].click();

    useEffect(() => {
        setIsUpdatingAva(false)
    },[profile])
    
    if (!profile)

        return (
            <Box className={classes.appintro}>
                <Box className={classes.banner_container}>
                    <Box className={classes.circle_container}>
                        <img src="/logoMedia3.png" alt="" className={classes.media3} />
                        <img src="/logoMedia4.png" alt="" className={classes.media4} />
                        <StyleRoot>
                            <div style={styles.tada}>
                                <img src="/logoAli.png" alt="" />
                            </div>
                        </StyleRoot>
                        <StyleRoot>
                            <div style={styles.slideInUp}>
                                <Typography variant="h5" color="primary" style={{ color: '#46a9d4' }}><i>Let's have a fun time together !</i></Typography>

                            </div>
                        </StyleRoot>
                        <img src="/logoMedia1.png" alt="" className={classes.media1} />
                        <img src="/logoMedia2.png" alt="" className={classes.media2} />
                    </Box>

                    <Typography variant="body1" color="primary" fontWeight="fontWeightBold">Created by Linh Tran</Typography>

                </Box>
            </Box>
        )
    return (
        <Box className={classes.userinfo}>

            <Box className={classes.userframe}>
                <Box className={classes.title}>
                    <Typography variant="h4" color="inherit" fontWeight="fontWeightBold" gutterBottom><PersonIcon style={{ fontSize: 45, position: 'relative', top: 10, left: 20 }} />&nbsp; &nbsp;Profile</Typography>
                </Box>
                <Grid container direction="row" justify="center" alignItems="flex-start" style={{ width: '100%' }}>
                    <Grid item sm={12} md={6} lg={4} style={{ height: '230px' }}>
                        <form encType="multipart/form-data" onSubmit={handleSubmitAvatar} ref={formRef} method="post">
                            <div className={classes.img_container} >
                                <img src={profile.avatar ? profile.avatar : '/default-avatar.jpg'} alt="" className={classes.img} />
                                { isUpdatingAva && <div className={classes.loading}><CircularProgress  /></div> }
                                <div className={classes.button_container}>
                                    <label className={classes.button}>
                                        <VisibilityIcon />
                                    </label>
                                    <label className={classes.button}>
                                        <PhotoCameraIcon />
                                        <input id="avatar" type="file" name="avatar" style={{ display: 'none' }} onChange={handleChangeAvatar} />
                                        <input type="submit" name="submit" style={{ display: 'none' }} />
                                    </label>
                                </div>
                            </div>

                        </form>

                    </Grid>
                    <Grid item sm={12} md={6} lg={8} className={classes.details}   >
                        <Box borderBottom={2} mb={2}>
                            <Typography gutterBottom>“Your time is limited, so don’t waste it living someone else’s life. Don’t be trapped by dogma – which is living with the results of other people’s thinking.” – Steve Jobs</Typography>
                        </Box>
                        <Typography variant="h2" gutterBottom>{`${profile.lastname} ${profile.firstname}` || profile.name}</Typography>
                        <Typography gutterBottom>Email: {profile.email}</Typography>

                        <Box my={3}>
                            {profile._id === user._id ? (
                                <ModalUpdateProfile />
                            ) : (
                                <Button variant="contained" color="primary" size="medium" endIcon={<TelegramIcon />}>Send Message </Button>
                            )}
                        </Box>
                    </Grid>
                </Grid>
            </Box>
        </Box>
    )
}

export default AppWall