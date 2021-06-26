import { Box, Grid, Typography, Avatar, Chip } from '@material-ui/core';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import React from 'react';
import ImageModal from '../ImageModal';
import AvatarGroup from '@material-ui/lab/AvatarGroup';
import NotifyMessage from './NotifyMessage';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';


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
        wordBreak: 'break-word',

    },
    mymessage_content_box: {
        width: '100%',
        display: 'flex',
        flexDirection: 'row-reverse',
        justifyContent: 'flex-start',
        alignItems: 'center',
        '&:hover $mymessage_time': {
            visibility: 'visible'
        }
    },
    mymessage_time: {
        backgroundColor: 'rgba(0,0,0,0.5)',
        color: 'white',
        padding: '5px 10px 3px 10px',
        marginRight: 15,
        borderRadius: '10px',
        visibility: 'hidden'
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
    chip : {
        height: '18px',
        fontSize: '11px',
        marginLeft: 3
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
                                { isLastMessage && (!isNaN(time.getTime()) ?  (<Chip
                                                                                    className={classes.chip}
                                                                                    variant="outlined"
                                                                                    size="small"
                                                                                    label={`${timeString}`}
                                                                                    classes={{deleteIcon: classes.deleteIcon }}
                                                                                    onDelete={handleDelete}
                                                                                    deleteIcon={<CheckCircleIcon />}
                                                                                />)  : <Chip
                                                                                className={classes.chip}
                                                                                variant="outlined"
                                                                                size="small"
                                                                                label="sending..." />
                                                                                )}
                            </Typography>
                        </div>
                        { message?.attachment ? (
                            <div className={classes.mymessage_content_box}>
                                <ImageModal url={message?.attachment} minWidth="200px" maxWidth="200px" minHeight="200px" maxHeight="200px" border="6px" />
                                <Typography variant="subtitle2" className={classes.mymessage_time}>{dateString}</Typography>
                            </div>
                        ) : (
                            <div className={classes.mymessage_content_box}>
                                <div className={classes.mymessage_content}>
                                    {message?.text}
                                </div>
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