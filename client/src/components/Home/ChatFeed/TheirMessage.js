import { Avatar, Box, Grid } from '@material-ui/core';
import React from 'react';
import { StyledBadgeStatic, useStyle } from './style';


const TheirMessage = ({message, forwardRef}) => {
    const classes = useStyle();
    const time = new Date(parseInt(message.createdAt));
    return (
        <Box width="100%" className={classes.message} my={1} ref={forwardRef}>
            <Grid container style={{ minHeight: 50 }} direction="row" justify="center" alignItems="flex-start">
                <Grid item xs={1} className={classes.message_avatar}>
               <StyledBadgeStatic     overlap='circle'
                                     anchorOrigin={{
                                    vertical: 'bottom',
                                    horizontal: 'right',
                                }}
                                variant="dot">
               <Avatar src={message?.sender?.avatar} />
               </StyledBadgeStatic>
                  
                </Grid>
                <Grid item xs={11} className={classes.theirmessage_box} >
                { message?.attachment ? ( <img src={message?.attachment}
                         className={classes.message_image}
                    />) : (     <div className={classes.theirmessage_content}>
                                {message?.text}
                        </div>)}
               
                    <div className={classes.message_time}>
                    {`${time.getHours().toString()}:${time.getMinutes().toString()}`}
                    </div>
               
                </Grid>
              
            </Grid>
        </Box>
    )
};

export default TheirMessage;