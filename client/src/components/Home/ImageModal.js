// eslint-disable-next-line
import { Box, Modal } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import React from 'react';


function getModalStyle() {
    const top = 50;
    const left = 50;
    return {
        top: `${top}%`,
        left: `${left}%`,
        transform: `translate(-${top}%, -${left}%)`,
    };
}

const useStyles = makeStyles((theme) => ({
    paper: {
        position: 'absolute',
        minWidth : '50vw',
        padding: 20,
        backgroundColor: theme.palette.background.paper,
        border: '2px solid white',
        borderRadius: 10,
        boxShadow: theme.shadows[5],
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    imaCover : {
        objectFit: 'cover',
        maxHeight: '80vh', 
        maxWidth: '80vw',
    }
}));


const ImageModal = ({url, maxWidth, minWidth, minHeight, maxHeight, border}) => {
 
    const classes = useStyles();
    const [modalStyle] = React.useState(getModalStyle);
    const [open, setOpen] = React.useState(false);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const body = (
            <Box style={modalStyle} className={classes.paper} >
                <img src={url} className={classes.imaCover}/>
            </Box>
    );
    return (
        <div>
            <img src={url} style={{minWidth, maxWidth, minHeight, maxHeight, borderRadius: border, objectFit: 'cover', cursor: 'pointer'}} onClick={handleOpen}/>
            <Modal
                open={open}
                style={{ alignItems: "center", justifyContent: "center" }}
                onClose={handleClose}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
            >
                {body}
            </Modal>
        </div>
    );
}

export default ImageModal;