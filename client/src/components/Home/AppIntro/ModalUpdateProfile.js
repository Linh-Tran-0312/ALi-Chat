import { TextareaAutosize, Box, TextField, Grid, Button, Modal, Typography } from '@material-ui/core';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import BorderColorIcon from '@material-ui/icons/BorderColor';
import PersonIcon from '@material-ui/icons/Person';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';


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
        minWidth : 300,
        padding: 20,
        backgroundColor: theme.palette.background.paper,
        border: '2px solid white',
        borderRadius: 10,
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    inputcontainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'flex-start'
    },
    input: {
        width: "90%",
        marginTop: 15,
        marginBottom: 15
    },
    userframe: {
        boxSizing: 'border-box',
        width: '80%',

        backgroundColor: 'rgba(0,0,0, 0.4)',
        borderRadius: 10,
        color: 'white',
        padding: 10
    },
    title: {
        width: '100%',
        color: '#5B9BD5'
    },
    details: {
        display: 'flex',
        marginTop: 15,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
    },
    img_container: {
        marginTop: 15,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'flex-start',
        width: '100%',

    },
    img: {
        width: '90%',
        height: '100%',
        maxWidth: 250,
        maxHeight: 350,
        objectFit: 'cover',
        borderRadius: 5,
        cursor: "pointer"
    },
    textarea: {
        resize: 'both'
    }

}));


const ModalUpdateProfile = () => {
    const profile = useSelector(state => state.profile);
    const classes = useStyles();
    const [modalStyle] = React.useState(getModalStyle);
    const [open, setOpen] = React.useState(false);
    const [ localURL, setLocalURL ] = useState("");
    //const file = useRef(null)
    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setLocalURL("")
    };

    const handleChangeImage = (e) => {
        const reader = new FileReader();
        const file = e.target.files[0];
        console.log(file.type.match('image.*'))
        const url = reader.readAsDataURL(file);
        reader.onloadend = (e) => {       
            setLocalURL(reader.result);
        };
       
    }
    const body = (

        <form encType="multipart/form-data" onSubmit={handleSubmit}>
            <Box style={modalStyle} className={classes.paper} >
            <Box className={classes.title} textAlign="center" my={2}>
                <Typography variant="h5" color="inherit" fontWeight="fontWeightBold" gutterBottom>Update your Profile</Typography>
            </Box>
            <Grid container direction="row" justify="center" alignItems="flex-start" style={{ width: '100%' }}>
                <Grid item xs={12} sm={12} md={6} lg={4} className={classes.img_container} >
                    <label>
                        <input  id="avatar" style={{ display: 'none' }} type="file" name="avatar" onChange={handleChangeImage}/>
                        <img  src={ localURL ? localURL : (profile.avatar ? profile.avatar : '/default-avatar.jpg')} className={classes.img} />
                    </label>


                </Grid>
                <Grid item xs={12} sm={12} md={6} lg={8} className={classes.details}   >
                    <Box width={1} mb={2}>
                        <TextField rows={3}
                            label="Story"
                            placeholder="Say something about yourself..."
                            defaultValue="voluptatum recusandae aliquam, ratione error beatae velit fuga repudiandae aliquid, voluptate similique nam"
                            multiline
                            variant="outlined"
                            inputProps={{ className: classes.textarea }}
                            style={{ width: '100%' }}
                            name="story"
                        />
                    </Box>
                    <Grid style={{ width: '100%' }} container direction="row" justify="space-between" alignItems="center">
                        <Grid item xs={12} sm={12} md={6}>
                            <TextField required className={classes.input} label="Last name" name="lastname" defaultValue={profile.lastname} />
                        </Grid>
                        <Grid item xs={12} sm={12} md={6}>
                            <TextField required className={classes.input} label="First name" name="firstname" defaultValue={profile.firstname} />
                        </Grid>
                    </Grid>

                    <Box width={1} mt={5} textAlign="center">
                        <Button variant="contained" color="primary" size="medium">Apply</Button>
                    </Box>
                </Grid>
            </Grid>
        </Box>
        </form>


    );
    return (
        <div>
            <Button variant="contained" size="medium" color="primary" onClick={handleOpen} endIcon={<BorderColorIcon />} >
                Update
          </Button>
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

export default ModalUpdateProfile;