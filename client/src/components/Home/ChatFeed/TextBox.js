import { Box, IconButton, InputAdornment, Paper, InputBase, TextField } from '@material-ui/core';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import ImageIcon from '@material-ui/icons/Image';
import SendIcon from '@material-ui/icons/Send';
import React, { useContext, useState, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { sendMessage } from '../../../actions/chat';
import { SocketContext } from './../../../context.socket';
import Compress from 'compress.js';

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

const initialState = {
    conversation: "",
    recipients: [],
    sender: "",
    attachment: '',
    text: ''
}
const TextBox = ({ conversation, friendId, setSearchTerm }) => {
    console.log('textbox render');
    //const [formData, setFormData] = useState(initialState);
    const [text, setText] = useState("")
    //const [ urlImage, setUrlImage ] = useState("");
    const [ image, setImage ] = useState({});
    const currentUserId = JSON.parse(localStorage.getItem('profile')).result._id;
    console.log(currentUserId);
    const classes = useStyles();
    const dispatch = useDispatch();
    const socket = useContext(SocketContext);
    const fileRef = useRef();

    const setNewMessage = (e) => {
        setText(e.target.value);
    }
    const submitMessage = (formData, urlImage) => {
        if (conversation?._id) {
            socket.emit('sendMessage', formData);
            dispatch(sendMessage({...formData, attachment: urlImage}));
                
            setText("");
            
        }
        else {
            socket.emit('createNewConversation', formData);
            dispatch(sendMessage({...formData, attachment: urlImage}));
            setText("");          
            
        }
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        if(text) {
            const formData = {
                conversation: conversation?._id,
                recipients: conversation?.people || [friendId, currentUserId],
                sender: currentUserId,
                attachment: '',
                text: text,
                isReadBy: [currentUserId]
            }       
            return submitMessage(formData)
        }  
     
    }
 
    const handleClickFile = () => {
           fileRef.current.click();
    }
    const selectFile = (e) => {
        const compress = new Compress();
        const image = [...e.target.files];
        const reader = new FileReader();
        if(image[0]) {
            reader.onload = (e) => {
               
                compress.compress(image, { size: 1}).then(results  => {
                    const img1 = results[0]
                    const base64str = img1.data
                    const imgExt = img1.ext
                    const compressedImg = Compress.convertBase64ToFile(base64str, imgExt)
                    const  formData = {
                        conversation: conversation._id,
                        recipients: conversation.people || [friendId, currentUserId],
                        sender: currentUserId,
                        attachment: {
                            body: compressedImg,
                            name: image[0].name,
                        },
                        text: "",
                        isReadBy: [currentUserId]
                    };   
                    return submitMessage(formData, reader.result);
                })
             }
             reader.readAsDataURL(image[0]);
            }          
        
    }
    const handleSetSearchTerm = () => {
        if (conversation?._id) {
            console.log('da focus')
            setSearchTerm("");
        }
    }
    return (
        <StyledBox width={1} borderTop={2} className={classes.textbox}  >
            <Paper component="form" onSubmit={handleSubmit} style={{ width: '90%' }} className={classes.centeralign}>               
                <IconButton onClick={handleClickFile}>                      
                    <input type="file" name="img" ref={fileRef} style={{ display: 'none' }} onChange={selectFile} />
                    <ImageIcon />
                </IconButton>             
                <InputBase placeholder="Say something..."
                    type="text"
                    variant="outlined"
                    value={text}
                    style={{ width: '90%' }}
                    inputProps={{ 'aria-label': '&nbsp;&nbsp; Say something...' }}
                    onChange={setNewMessage}
                    onFocus={handleSetSearchTerm}
                />
                <IconButton type="submit">
                    <SendIcon />
                </IconButton>


            </Paper>
        </StyledBox>
    )
};

export default TextBox;