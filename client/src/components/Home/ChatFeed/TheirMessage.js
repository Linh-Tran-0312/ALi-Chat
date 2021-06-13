import { Avatar, Box, Grid, Tooltip, Badge, Typography } from '@material-ui/core';
import React from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles'
import ImageModal from '../ImageModal';
const StyledBadgeStatic =  withStyles((theme) => ({
    badge: {
      backgroundColor: '#44b700',
      color: '#44b700',
      boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    
    },
    '@keyframes ripple': {
      '0%': {
        transform: 'scale(1)',
        opacity: 1,
      },
      '100%': {
        transform: 'scale(2.4)',
        opacity: 0,
      },
    },
  }))(Badge);

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
    theirmessage_box: {
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'flex-start'
    },
    message_time: {
        padding: 10,
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    message_hidden: {
        visibility: 'hidden',
        padding: 10,
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    theirmessage_content: {
        maxWidth: '60%',
        height: '100%',
        minHeight: 35,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'flex-start',
        padding: 10,
        borderRadius: "17px",
        backgroundColor: '#d6dce5',
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

const TheirMessage = ({ message, forwardRef, nextMessage, isLastMessage }) => {
    const classes = useStyles();
    const time = new Date(parseInt(message.createdAt));
   // console.log(message?.senderInfo[0]?.avatar);
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
                                <Avatar src={message?.senderInfo[0]?.avatar} />

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

                    {message?.attachment ? (<ImageModal url={message?.attachment } minWidth="200px" maxWidth="200px" minHeight="200px" maxHeight="200px" border="6px" />
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