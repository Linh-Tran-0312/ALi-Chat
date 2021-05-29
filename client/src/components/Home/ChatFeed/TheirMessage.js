import { Avatar, Box, Grid, Tooltip, Typography } from '@material-ui/core';
import React from 'react';
import { StyledBadgeStatic, useStyle } from './style';
import { withStyles } from '@material-ui/core/styles'

 

const TheirMessage = ({ message, forwardRef, nextMessage, isLastMessage }) => {
    const classes = useStyle();
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
                <Grid item xs={1} className={classes.message_avatar}>
                    {
                        message.sender !== nextMessage?.sender ? (
                            <StyledBadgeStatic overlap='circle'
                                anchorOrigin={{
                                    vertical: 'bottom',
                                    horizontal: 'right',
                                }}
                                variant="dot">
                                <Avatar src={message?.sender?.avatar} />
                            </StyledBadgeStatic>
                        ) : null
                    }
                    {
                        isLastMessage && (<Typography variant="caption" className={classes.message_hidden}>
                            Hidden
                        </Typography>)
                    }

                </Grid>
                <Grid item xs={11} className={classes.theirmessage_box} >
                   
                        {message?.attachment ? (<img src={message?.attachment} className={classes.message_image} />
                        ) : (
                            <div className={classes.theirmessage_content}>                         
                                 {/* <Tooltip title={dateString} placement="right"> */}
                                {
                                    message.recipients.length > 2 && (<Typography variant="caption" color="primary">
                                        {message.senderInfo[0].firstname}
                                    </Typography>)
                                }

                                <Typography variant="body1" >
                                    {message?.text}
                                </Typography>
                            {/* </Tooltip> */}
                            </div>
 
                        )}
                   
                        <Typography variant="caption" className={isLastMessage ? classes.message_time : null}>
                            {`${timeString}`}
                        </Typography>

                </Grid>

                </Grid>
        </Box>
    )
};

export default TheirMessage;