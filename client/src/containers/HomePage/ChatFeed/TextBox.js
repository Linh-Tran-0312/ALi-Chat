import { Box, IconButton, InputBase, Paper } from '@material-ui/core';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import ImageIcon from '@material-ui/icons/Image';
import SendIcon from '@material-ui/icons/Send';
import Compress from 'compress.js';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { sendMessage } from '../../../actions/chat';
import { emitCreateNewConversation, emitSendMessage, emitUserIsTypingMessage, emitUserStopTyingMessage } from '../socket.js';

const useStyles = makeStyles((theme) => ({
    centeralign: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    textbox: {
        height: 100,
        backgroundColor: '#e5eaff',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    input: {
        backgroundColor: 'white',
    }
}));

const StyledBox = withStyles({
    root: {
      borderColor: `white`,
    },
  })(Box);


const TextBox = ({ conversation, friendId, setSearchTerm }) => {
    console.log('TextBox render');
    const currentUser = JSON.parse(localStorage.getItem('profile')).result;
    const [text, setText] = useState("")
  
    const classes = useStyles();
    const dispatch = useDispatch();

    const fileRef = useRef();

    const setNewMessage = (e) => {
        setText(e.target.value);
    }
    const submitMessage = (formData, urlImage) => {
        if (conversation?._id) {
           emitSendMessage(formData);
            dispatch(sendMessage({...formData, attachment: urlImage}));
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
                isReadBy:  [currentUser._id]
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
                        isReadBy:  [currentUser._id]
                    };   
                    return submitMessage(formData, reader.result);
                })
             }
             reader.readAsDataURL(images[0]);
        }          
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
        if(conversation?._id && !!text) {
           emitUserStopTyingMessage({ conversationId: conversation._id, userId: currentUser._id })
        }
    }
    useEffect(() => {
        setText("");
    },[conversation])
    return (
        <StyledBox width={1} borderTop={2} className={classes.textbox}  >
            <Paper component="form" onSubmit={handleSubmit} style={{ width: '90%' }} className={classes.centeralign}>               
                <IconButton onClick={handleClickFile}>                      
                    <input type="file" name="img" ref={fileRef} style={{ display: 'none' }} onChange={selectFile} />
                    <ImageIcon />
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