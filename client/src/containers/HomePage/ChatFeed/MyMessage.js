import { Box, Grid, Typography, Avatar, Chip, IconButton } from '@material-ui/core';
import ReplyOutlinedIcon from '@material-ui/icons/ReplyOutlined';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import React from 'react';
import { useDispatch } from 'react-redux';
import ImageModal from '../../../components/ImageModal';
import AvatarGroup from '@material-ui/lab/AvatarGroup';
import NotifyMessage from './NotifyMessage';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import { replyMessage } from '../../../actions/chat';


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

        padding: 5,
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    mymessage_content: {
        height: '100%',
        minHeight: 35,
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center',
        padding: 10,
        borderRadius: "13px",
        backgroundColor: '#8faadc',
        color: 'white',
        fontFamily: 'Open Sans',
        wordBreak: 'break-word',
        position: 'relative',
        zIndex: 5

    },
    mymessage_content_box: {
        width: '100%',
        display: 'flex',
        flexDirection: 'row-reverse',
        justifyContent: 'flex-start',
        alignItems: 'center',
        '&:hover $mymessage_time': {
            visibility: 'visible'
        },
        '&:hover $reply': {
            visibility: 'visible'
        }
    },
    mymessage_time: {
        backgroundColor: 'rgba(0,0,0,0.5)',
        color: 'white',
        padding: '5px 10px 3px 10px',
        borderRadius: '10px',
        visibility: 'hidden'
    },
    reply: {
        visibility: 'hidden',
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

    },
    deleteIcon: {
        height: '15px',
        color: "#8faadc"
    },
    chip: {
        height: '18px',
        fontSize: '11px',
        marginLeft: 3
    },
    repliedMessage: {
        backgroundColor: 'rgba(207,207,225, 0.4)',
        color: '#676770',
        fontFamily: 'Open Sans',
        position: 'relative',
        zIndex: 0,
        bottom: '-10px',
        padding: '13px',
        paddingBottom: '20px',
        borderRadius: '10px',
        fontFamily: 'Open Sans',
        wordBreak: 'break-word',

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

const MyMessage = ({ message, forwardRef, nextMessage, isLastMessage }) => {

    const currentUser = JSON.parse(localStorage.getItem('profile')).result;

    const classes = useStyles();
    const dispatch = useDispatch();
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

    const handleDelete = () => {
    }
    const handleReplyMessage = () => {
        dispatch(replyMessage(message))
    }

    const renderRepliedMessage = (msg) => {
        
       return (
             
           <div className={classes.repliedMessage}>
                  <Typography variant="caption" color="primary"  >
                   {
                       msg.sender === currentUser._id ? 'Your message:' : `${msg.senderInfo[0].firstname}'s message:`
                   }
                </Typography>
                <br />
                {
                    msg.text ? msg.text :  <ImageModal url={msg.attachment} minWidth="150px" maxWidth="150px" minHeight="150px" maxHeight="150px" border="6px" />

                }
            </div>  
        )
    }
    return (
        <>
            <Box width="100%" className={classes.message} my={1} ref={forwardRef}>
                <Grid container style={{ minHeight: 50 }} direction="row" justify="center" alignItems="flex-start">
                    <Grid item xs={12} className={classes.mymessage_box}>
                        <div className={isLastMessage ? classes.message_time : null}>
                            <StyledAvaGroup max={10} spacing={4}>
                                {
                                    isLastMessage && (message?.isReadByInfo?.map((reader, index) => { if (reader._id !== message.sender) return (<Avatar key={index} alt="" src={reader.avatar} />) }))
                                }
                            </StyledAvaGroup>
                            <Typography variant="caption" >
                                {isLastMessage && (!isNaN(time.getTime()) ? (<Chip
                                    className={classes.chip}
                                    variant="outlined"
                                    size="small"
                                    label={`${timeString}`}
                                    classes={{ deleteIcon: classes.deleteIcon }}
                                    onDelete={handleDelete}
                                    deleteIcon={<CheckCircleIcon />}
                                />) : <Chip
                                    className={classes.chip}
                                    variant="outlined"
                                    size="small"
                                    label="sending..." />
                                )}
                            </Typography>
                        </div>
                        {message?.attachment ? (
                            <div className={classes.mymessage_content_box}>
                                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', maxWidth: '60%' }}>
                                    {
                                        message?.replyToInfo?.length > 0 && renderRepliedMessage(message.replyToInfo[0])
                                    }
                                    <div style={{ position: 'relative', zIndex: 6 }}>
                                        <ImageModal url={message?.attachment} minWidth="180px" maxWidth="180px" minHeight="220px" maxHeight="220px" border="6px" />
                                    </div>
                                </div>
                                <IconButton size="small" className={classes.reply} onClick={handleReplyMessage}>
                                    <ReplyOutlinedIcon />
                                </IconButton>
                                <Typography variant="subtitle2" className={classes.mymessage_time}>{dateString}</Typography>
                            </div>
                        ) : (
                            <div className={classes.mymessage_content_box}>
                                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', maxWidth: '50%' }}>
                                    {
                                        message?.replyToInfo?.length > 0 && renderRepliedMessage(message.replyToInfo[0])
                                    }
                                    <div className={classes.mymessage_content}>
                                        {message?.text}
                                    </div>
                                </div>
                                <IconButton size="small" className={classes.reply} onClick={handleReplyMessage}>
                                    <ReplyOutlinedIcon />
                                </IconButton>
                                <Typography variant="subtitle2" className={classes.mymessage_time}>{dateString}</Typography>
                            </div>
                        )
                        }
                    </Grid>
                </Grid>
            </Box>
            {
                isDiffTime && (<NotifyMessage message={timeNextMessage} color="default" />)
            }
        </>
    )
};

export default MyMessage;