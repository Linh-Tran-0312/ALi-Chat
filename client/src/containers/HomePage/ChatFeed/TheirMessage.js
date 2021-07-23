import { Avatar as OAvatar, Box, Chip, Grid, Typography } from '@material-ui/core';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import AlarmIcon from '@material-ui/icons/Alarm';
import AvatarGroup from '@material-ui/lab/AvatarGroup';
import React from 'react';
import { useSelector } from 'react-redux';
import Avatar from '../../../components/Avatar';
import ImageModal from '../../../components/ImageModal';
import NotifyMessage from './NotifyMessage';

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
        padding: 5,
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
    theirmessage_content_box: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        '&:hover $theirmessage_time': {
            visibility: 'visible'
        }
    },
    theirmessage_time: {
        backgroundColor: 'rgba(0,0,0,0.5)',
        color: 'white',
        padding: '5px 10px 3px 10px',
        marginLeft: 15,
        borderRadius: '10px',
        visibility: 'hidden'
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
        backgroundColor: 'white',
        fontFamily: 'Open Sans',
        wordBreak: 'break-word'
    },
    message_image: {
        marginRight: 18,
        objectFit: 'cover',
        borderRadius: 6,
        height: '30vw',
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
    },
    avatar: 
    { "&&" :{
        height: '15px',
        color: "#474646"
      }},
    chip : {
        height: '18px',
        fontSize: '11px'
    },
    xs : {
        paddingLeft: '5px'
    }
}));

const StyledAvaGroup = withStyles(() => ({
    root: {
        '& .MuiAvatarGroup-avatar': {
            width: 15,
            height: 15
        }
    }
}))(AvatarGroup);

const TheirMessage = ({ message, forwardRef, nextMessage, isLastMessage }) => {

    const classes = useStyles();
    const { mode } = useSelector(state => state.layout);
    const matchXS = mode === 'XS';
    const time = new Date(parseInt(message.createdAt));

    const revertStringToTime = (string) => {
        const time = new Date(parseInt(string));
        if (!isNaN(time.getTime())) {
            const hour = time.getHours().toString();
            let minute = time.getMinutes().toString();
            if (minute.length === 1) {
                minute = `0${minute}`
            }
            const timeString = `${hour}:${minute}`;
            const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
            const day = time.getDate().toString();
            const month = months[time.getMonth()];
            const year = time.getFullYear().toString();
            const dateString = `${timeString} ${month} ${day}, ${year}`

            return { timeString, dateString }
        }
    }
    let timeString, dateString;

    const timeResult = revertStringToTime(message?.createdAt);

    timeString = timeResult?.timeString || "";
    dateString = timeResult?.dateString || "";

    if (!isLastMessage) {
        timeString = ""
    }
    let timeNextMessage;
    const isDiffTime = parseInt(nextMessage?.createdAt) - time > 21600000;
    if (isDiffTime) {
        timeNextMessage = revertStringToTime(nextMessage.createdAt);
        timeNextMessage.text = timeNextMessage.dateString;
    }
 
    return (
        <>
            <Box width="100%" className={classes.message} my={1} ref={forwardRef}>
                <Grid container style={{ minHeight: 50 }} direction="row" justify="center" alignItems="flex-start">
                    <Grid item xs={1} className={classes.message_avatar}>
                        {
                            message.sender !== nextMessage?.sender ? (
                                <Avatar url={message?.senderInfo[0]?.avatar} userId={message?.senderInfo[0]?._id} size={matchXS ? 25 : 35} type={2} />
                            ) : null
                        }
                        {
                            isLastMessage && (<Typography variant="caption" className={classes.message_hidden}>
                                Hidden
                            </Typography>)
                        }
                    </Grid>
                    <Grid item xs={11} className={ matchXS ? `${classes.theirmessage_box} ${classes.xs}` : classes.theirmessage_box} >
                        {message?.attachment ? (
                            <div className={classes.theirmessage_content_box}>
                                <ImageModal url={message?.attachment} minWidth="200px" maxWidth="200px" minHeight="200px" maxHeight="200px" border="6px" />
                                <Typography className={classes.theirmessage_time}>{dateString}</Typography>
                            </div>
                        ) : (
                            <div className={classes.theirmessage_content_box}>
                                <div className={classes.theirmessage_content}>
                                    {
                                        message.recipients.length > 2 && (<Typography variant="caption" color="primary">
                                            {message.senderInfo[0].firstname}
                                        </Typography>)
                                    }
                                    <Typography variant="body1" >
                                        {message?.text}
                                    </Typography>
                                </div>
                                <Typography className={classes.theirmessage_time}>{dateString}</Typography>
                            </div>
                        )}
                        <div className={isLastMessage ? classes.message_time : null}>
                            {
                                isLastMessage && (
                                    <Typography variant="caption" className={isLastMessage ? classes.message_time : null}>
                                    <Chip
                                        className={classes.chip}
                                        variant="outlined"
                                        size="small"
                                        avatar={<AlarmIcon />}
                                        label={`${timeString}`}
                                        classes={{avatar: classes.avatar }}
                                  
                                    />
                                    </Typography>
                                )
                            }               
                            <StyledAvaGroup max={10} spacing={4}  >
                                {
                                    isLastMessage && (message?.isReadByInfo?.map((reader, index) => { if (reader._id !== message.sender) return (<OAvatar key={index} alt="" src={reader.avatar} />) }))
                                }
                            </StyledAvaGroup>                     
                        </div>
                    </Grid>
                </Grid>
            </Box>
            {
                isDiffTime && (<NotifyMessage message={timeNextMessage} color="default" />)
            }
        </>
    )
};

export default TheirMessage;