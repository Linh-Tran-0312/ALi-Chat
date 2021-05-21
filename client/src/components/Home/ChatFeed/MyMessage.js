import React from 'react';
import { Avatar, Grid, Box} from '@material-ui/core';
import { useStyle } from './style';


const MyMessage = ({message, forwardRef}) => {
    const classes = useStyle();
    const currentUser = JSON.parse(localStorage.getItem('profile')).result;

    const time = new Date(parseInt(message.createdAt));
    return (
        <Box width="100%" className={classes.message} my={1} ref={forwardRef}>
            <Grid container style={{ minHeight: 50 }} direction="row" justify="center" alignItems="flex-start">
                <Grid item xs={11} className={classes.mymessage_box}>
                    <div className={classes.message_time}>
                        {`${time.getHours().toString()}:${time.getMinutes().toString()}`}
                    </div>
                    { message?.attachment ? ( <img src={message.attachment}
                         
                        className={classes.message_image}
                       
                    />) : (<div className={classes.mymessage_content}>
                        {message?.text}
                    </div>)}
                </Grid>
                <Grid item xs={1} className={classes.message_avatar}>
                    <Avatar src={message?.sender?.avatar} />
                </Grid>


            </Grid>
        </Box>
    )
};

export default MyMessage;