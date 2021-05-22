import { Box, IconButton, InputAdornment, TextField } from '@material-ui/core';
import ImageIcon from '@material-ui/icons/Image';
import SendIcon from '@material-ui/icons/Send';
import React, { useContext, useState } from 'react';
import { useDispatch } from 'react-redux';
import { sendMessage } from '../../../actions/chat';
import { SocketContext } from './../../../context.socket';
import { useStyle } from './style';


const initialState = {
    conversation: "",
    recipients: [],
    sender: "",
    attachment: '',
    text: ''
}
const TextBox = ({ conversationId, friendId, setSearchTerm }) => {

    const [ formData, setFormData] = useState(initialState);
    const [ text, setText ] = useState("")

    const currentUserId = JSON.parse(localStorage.getItem('profile')).result._id;
    const classes = useStyle();
    const dispatch = useDispatch();
    const socket = useContext(SocketContext);

    const setNewMessage = (e) => {
        setText(e.target.value)
        setFormData({
            conversation: conversationId,
            recipients: [friendId, currentUserId],
            sender: currentUserId,
            attachment: '',
            text: e.target.value
        })
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        
        if(conversationId) {
        
            socket.emit('sendMessage', formData, clear());
            dispatch(sendMessage(formData))
            setText("")
        }
        else {
            console.log("Da toi dispatch");
          /*   dispatch(createFirstMessage(formData)); */
            socket.emit('createNewConversation', formData);
            setText("");    
            clear();
        }
      
    }
    const clear = () => {
        setFormData(initialState)
    }

    const handleSetSearchTerm = () => {
        if(conversationId) {
            console.log('da focus')     
            setSearchTerm("");
        }       
    }
    return(
    <Box width={1} className={classes.textbox}  >
        <form onSubmit={handleSubmit}   style={{ width: '100%' }} className={classes.centeralign}>
        <TextField   placeholder="Say something..."
                    type="text" 
                    variant="outlined" 
                   
                    value={text} 
                    style={{ width: '90%' }}
                    InputProps={{endAdornment: (
                        <InputAdornment position="end">
                            <IconButton>
                                <ImageIcon/>
                            </IconButton>
                            <IconButton type="submit">
                                <SendIcon />
                            </IconButton>                          
                        </InputAdornment>
                      ), className: classes.input}}
                      onChange={setNewMessage} 
                      onFocus={handleSetSearchTerm}                
                    />
        </form>
    </Box>
    )
};

export default TextBox;