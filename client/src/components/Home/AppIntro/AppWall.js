import { Box, Button, Grid, Typography } from '@material-ui/core';
import BorderColorIcon from '@material-ui/icons/BorderColor';
import MaleIcon from '@material-ui/icons/Male';
import PersonIcon from '@material-ui/icons/Person';
import TelegramIcon from '@material-ui/icons/Telegram';
import Radium, { StyleRoot } from 'radium';
import React from 'react';
import { slideInUp, tada } from 'react-animations';
import { useStyle } from './style';
import ModalUpdateProfile from './ModalUpdateProfile';


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

    const userId = JSON.parse(localStorage.getItem('profile')).result._id;
    const classes = useStyle();
   /* const profile = useSelector(state => state.user); */

    if (!profile)
        return (
            <Box className={classes.appintro}>
                <Box className={classes.banner_container}>
                    <Box className={classes.circle_container}>
                        <img src="/logoMedia3.png" className={classes.media3} />
                        <img src="/logoMedia4.png" className={classes.media4} />
                        <StyleRoot>
                            <div style={styles.tada}>
                                <img src="/logoAli.png" />
                            </div>
                        </StyleRoot>
                        <StyleRoot>
                            <div style={styles.slideInUp}>
                                <Typography variant="h5" color="primary" style={{ color: '#46a9d4' }}><i>Let's have a fun time together !</i></Typography>

                            </div>
                        </StyleRoot>
                        <img src="/logoMedia1.png" className={classes.media1} />
                        <img src="/logoMedia2.png" className={classes.media2} />
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
                    <Grid  item xs={12} sm={12} md={6} lg={4} className={classes.img_container} >
                        <img src="/DSC_0913.jpg" className={classes.img} />
                    </Grid>
                    <Grid item xs={12} sm={12} md={6} lg={8} className={classes.details}   >
                        <Box borderBottom={2} mb={2}>
                            <Typography gutterBottom>“Your time is limited, so don’t waste it living someone else’s life. Don’t be trapped by dogma – which is living with the results of other people’s thinking.” – Steve Jobs</Typography>
                        </Box>               
                        <Typography variant="h2" gutterBottom>{`${profile.lastname} ${profile.firstname}` || profile.name }</Typography>
                        <Typography gutterBottom>Email: {profile.email}</Typography>
                    
                        <Box my={3}>
                            {profile._id === userId ? (
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