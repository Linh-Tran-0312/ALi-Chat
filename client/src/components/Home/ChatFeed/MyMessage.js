import { Box, Grid, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import ImageModal from '../ImageModal';

const useStyles = makeStyles((theme) => ({
    message_avatar: {
        width: '100%',
        height: '100%',
        minHeight: 50,
        padding: 10,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    mymessage_box: {
        width: '100%',
        display: 'flex',
        flexDirection: 'column-reverse',
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
        marginRight: 10
    },
    message_time: {

        padding: 10,
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    mymessage_content: {
        maxWidth: '60%',
        height: '100%',
        minHeight: 35,
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center',
        padding: 10,
        borderRadius: "17px",
        backgroundColor: '#8faadc',
        color: 'white',
        fontFamily: 'Open Sans',
        wordBreak: 'break-word'
    },
    message_image: {
        marginRight: 18,
        objectFit: 'cover',
        borderRadius: 6,
        height: '30vw',
        /* width: 30vw; */
        maxHeight: 200,
        maxWidth: 200,
        minHeight: 100,
        minWidth: 100,
    },
    message: {
        minHeight: 50,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',

    }
}));

const MyMessage = ({ message, forwardRef, nextMessage, isLastMessage }) => {
    const classes = useStyles();
    const currentUser = JSON.parse(localStorage.getItem('profile')).result;

    const time = new Date(parseInt(message.createdAt));

    let timeString;
    let dateString;
    if (!isNaN(time.getTime())) {
        const hour = time.getHours().toString();
        let minute = time.getMinutes().toString();
        if (minute.length === 1) {
            minute = `0${minute}`
        }
        timeString = `${hour}:${minute}`;
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        const day = time.getDate().toString();
        const month = months[time.getMonth()];
        const year = time.getFullYear().toString();
        dateString = `${timeString} ${month} ${day}, ${year}`
    }
    if (!isLastMessage) {
        timeString = ""
    }

    return (

        <Box width="100%" className={classes.message} my={1} ref={forwardRef}>
            <Grid container style={{ minHeight: 50 }} direction="row" justify="center" alignItems="flex-start">

                <Grid item xs={12} className={classes.mymessage_box}>
                    <Typography variant="caption" className={isLastMessage ? classes.message_time : null}>
                        {!isNaN(time.getTime()) ? `${timeString}` : "sending..."}
                    </Typography>
                    {message?.attachment ? (<ImageModal url={message?.attachment } minWidth="200px" maxWidth="200px" minHeight="200px" maxHeight="200px" border="6px" />
                    ) : (
                        /*  <Tooltip title={dateString}   placement="left"> */
                        <div className={classes.mymessage_content}>
                            {message?.text}
                        </div>
                        /* <Tooltip /> */
                    )
                    }
                </Grid>

            </Grid>
        </Box>

    )

};

export default MyMessage;