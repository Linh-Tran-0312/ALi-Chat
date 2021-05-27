import React from 'react';
import { Avatar, Typography, Grid, Box, Tooltip } from '@material-ui/core';
import { useStyle } from './style';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import AutorenewIcon from '@material-ui/icons/Autorenew';
import DoneAllIcon from '@material-ui/icons/DoneAll';

const MyMessage = ({ message, forwardRef, nextMessage, isLastMessage }) => {
    const classes = useStyle();
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
                    {message?.attachment ? (<img src={message.attachment}

                        className={classes.message_image}

                    />) : (
                        <Tooltip title={dateString} placement="left">
                            <div className={classes.mymessage_content}>
                                {message?.text}
                            </div>
                        </Tooltip>
                    )}
                </Grid>
                
            </Grid>
        </Box>

    )

};

export default MyMessage;