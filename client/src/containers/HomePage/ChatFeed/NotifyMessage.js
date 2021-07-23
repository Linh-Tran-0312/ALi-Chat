import { Box, Chip } from '@material-ui/core';
import FaceIcon from '@material-ui/icons/Face';
import QueryBuilderIcon from '@material-ui/icons/QueryBuilder';
import React from 'react';

const NotifyMessage = ({ forwardRef, message, color, type}) => {
    return(
         <Box width={1} my={2}  ref={forwardRef} textAlign="center">
             <Chip  icon={ type == "face" ? <FaceIcon />: <QueryBuilderIcon />} color={color} size="small" label= {message.text} variant="outlined" />
        </Box>
    )
}

export default NotifyMessage;