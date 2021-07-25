import { Box, IconButton, InputBase, Paper, Grid, Typography } from '@material-ui/core';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import CancelOutlinedIcon from '@material-ui/icons/CancelOutlined';
import ImageIcon from '@material-ui/icons/Image';
import SendIcon from '@material-ui/icons/Send';
import MoodIcon from '@material-ui/icons/Mood';
import Compress from 'compress.js';
import Picker, { SKIN_TONE_NEUTRAL } from "emoji-picker-react";
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { sendMessage, replyMessage } from '../../../actions/chat';
import { emitCreateNewConversation, emitSendMessage, emitUserIsTypingMessage, emitUserStopTyingMessage } from '../socket.js';
import ImageModal from '../../../components/ImageModal';
const useStyles = makeStyles((theme) => ({
    centeralign: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    textbox: {
        position: 'relative',
        height: 100,
        backgroundColor: '#e5eaff',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    input: {
        backgroundColor: 'white',
    },
    reply_message : {
        width: '100%',
        minHeight: '70px',
        position: 'absolute',
        bottom: '100px',
        zIndex: 999,
        padding: '15px',
        backgroundColor: 'white',
        color: '#676770',

    }
}));

const StyledBox = withStyles({
    root: {
      borderColor: `white`,
    },
  })(Box);


const TextBox = ({ conversation, friendId, setSearchTerm }) => {
     
    const currentUser = JSON.parse(localStorage.getItem('profile')).result;
    const [text, setText] = useState("")
    const { isReplyingTo } = useSelector(state => state.messages)
    const classes = useStyles();
    const dispatch = useDispatch();

    const fileRef = useRef();
   // const [chosenEmoji, setChosenEmoji] = useState(null);
    const [ showPicker, setShowPicker ]= useState(false)

    const onEmojiClick = (event, emojiObject) => {
    //  setChosenEmoji(emojiObject);
      setText(text + emojiObject.emoji)
      setShowPicker(false)
    };

    const openPicker = () => {
      setShowPicker(preState => !preState)
    }
    const setNewMessage = (e) => {
        setText(e.target.value);
        if(e.target.value === "") {
            emitUserStopTyingMessage({ conversationId: conversation?._id, userId: currentUser?._id })
        }
    }
    const submitMessage = (formData, urlImage) => {
        if (conversation?._id) {
           emitSendMessage(formData);
           if(isReplyingTo) {
            dispatch(sendMessage({...formData, attachment: urlImage, replyToInfo: [isReplyingTo]}));
            dispatch(replyMessage(null));
           } else {
            dispatch(sendMessage({...formData, attachment: urlImage}));
           }
            setText("");
        }
        else {
            emitCreateNewConversation(formData);
            dispatch(sendMessage({...formData, attachment: urlImage}));
            setText("");            
        }
        setSearchTerm("");
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if(text) {
            const formData = {
                conversation: conversation?._id,
                recipients: conversation?.people || [friendId, currentUser._id],
                sender: currentUser._id,
                attachment: '',
                text: text,
                isReadBy:  [currentUser._id],
                replyTo: isReplyingTo?._id
            }       
            return submitMessage(formData)
        }    
    }
 
    const handleClickFile = () => {
           fileRef.current.click();
    }
    const selectFile = (e) => {
        const compress = new Compress();
        const images = [...e.target.files];
        const reader = new FileReader();
        if(images[0]) {
            reader.onload = (e) => {
               
                compress.compress(images, { size: 1}).then(results  => {
                    const img1 = results[0]
                    const base64str = img1.data
                    const imgExt = img1.ext
                    const compressedImg = Compress.convertBase64ToFile(base64str, imgExt)
                    const  formData = {
                        conversation: conversation._id,
                        recipients: conversation.people || [friendId, currentUser._id],
                        sender: currentUser._id,
                        attachment: {
                            body: compressedImg,
                            name: images[0].name,
                        },
                        text: "",
                        isReadBy:  [currentUser._id],
                        replyTo: isReplyingTo?._id
                    };   
                    return submitMessage(formData, reader.result);
                })
             }
             reader.readAsDataURL(images[0]);
        }          
    }

    const handleCancelReply = () => {
        dispatch(replyMessage(null))
    }
    const handleSetSearchTerm = () => {
        if (conversation?._id) {
            setSearchTerm("");
            if(text) {
                emitUserIsTypingMessage({ conversationId: conversation._id, user: { _id: currentUser._id, avatar : currentUser.avatar }})
            } 
        };

    }

    const handleUserStopTyping = () => {
        if(conversation?._id) {
           emitUserStopTyingMessage({ conversationId: conversation._id, userId: currentUser._id })
        }
    }
    useEffect(() => {
        setText("");
    },[conversation?._id])
    return (
        <StyledBox width={1} borderTop={2} className={classes.textbox}  >
                {
                    showPicker &&  <Picker
                    groupVisibility
                    pickerStyle={{ width: '100%', height: '300px', position: 'absolute', zIndex: 1000 , bottom: '100px'}} 
                    onEmojiClick={onEmojiClick}
                    disableAutoFocus={true}
                    disableSearchBar
                    skinTone={SKIN_TONE_NEUTRAL}
                    groupNames={{ smileys_people: "PEOPLE" }}
                
                />
                }
                { isReplyingTo && 
                  
                        <Grid container direction="row"
                                
                                alignItems="center"
                                  className={classes.reply_message}>
                            <Grid item xs={11}>
                            <Typography variant="caption" color="primary">
                                        { currentUser._id === isReplyingTo.sender ? `You're replying to your message:` : ` You're replying to ${isReplyingTo?.senderInfo[0]?.firstname}'s message:`} 
                            </Typography>
                            {
                                isReplyingTo.text ?  <Typography noWrap variant="body1" color="inherit">{isReplyingTo.text}</Typography> :
                                <ImageModal url={isReplyingTo.attachment}  minWidth="50px" maxWidth="50px" minHeight="50px" maxHeight="50px" border="6px"/>

                            }
                            </Grid>
                            <Grid item xs={1} style={{textAlign: 'right'}}>
                                <IconButton onClick={handleCancelReply}>
                                    <CancelOutlinedIcon />
                                </IconButton>
                            </Grid>
                        </Grid>
                    
                }
            <Paper component="form" onSubmit={handleSubmit} style={{ width: '90%' }} className={classes.centeralign}>               
                <IconButton onClick={handleClickFile}>                      
                    <input type="file" name="img" ref={fileRef} style={{ display: 'none' }} onChange={selectFile} />
                    <ImageIcon />
                </IconButton>   
                <IconButton onClick={openPicker}>                      
                    <MoodIcon />
                </IconButton>            
                <InputBase placeholder="Type your message..."
                    type="text"
                    variant="outlined"
                    value={text}
                    style={{ width: '90%' }}
                    inputProps={{ 'aria-label': '&nbsp;&nbsp; Say something...' }}
                    onChange={setNewMessage}
                    onFocus={handleSetSearchTerm}
                    onBlur={handleUserStopTyping}
                />
                <IconButton type="submit">
                    <SendIcon />
                </IconButton>
            </Paper>
        </StyledBox>
    )
};

export default TextBox;