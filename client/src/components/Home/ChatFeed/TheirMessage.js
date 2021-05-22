import { Avatar, Box, Grid, Tooltip } from '@material-ui/core';
import React from 'react';
import { StyledBadgeStatic, useStyle } from './style';


const TheirMessage = ({message, forwardRef, nextMessage, isLastMessage}) => {
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
        const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
        const day = time.getDate().toString();
        const month = months[time.getMonth()];
        const year = time.getFullYear().toString();
        dateString = `${timeString} ${month} ${day}, ${year}`
    }
    if(!isLastMessage) {
        timeString = ""
    }
    return (
        <Box width="100%" className={classes.message} my={1} ref={forwardRef}>
            <Grid container style={{ minHeight: 50 }} direction="row" justify="center" alignItems="flex-start">
                <Grid item xs={1} className={classes.message_avatar}>
                    {
                        message.sender !== nextMessage?.sender ? (
                        <StyledBadgeStatic     overlap='circle'
                                              anchorOrigin={{
                                             vertical: 'bottom',
                                             horizontal: 'right',
                                         }}
                                         variant="dot">
                        <Avatar src={message?.sender?.avatar} />
                        </StyledBadgeStatic>
                        ) : null
                    }
                              
                </Grid>
                <Grid item xs={11} className={classes.theirmessage_box} >
                { message?.attachment ? ( <img src={message?.attachment}
                         className={classes.message_image}
                    />) : (    
                        <Tooltip title={dateString} placement="right">
                                 <div className={classes.theirmessage_content}>
                                {message?.text}
                        </div>
                        </Tooltip> 
                      )}
               
                    <div className={isLastMessage ? classes.message_time : null}>
                    {`${timeString}`}
                    </div>
               
                </Grid>
              
            </Grid>
        </Box>
    )
};

export default TheirMessage;