
import { Box, Button, Grid, Modal, TextField, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import BorderColorIcon from '@material-ui/icons/BorderColor';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BeatLoader } from 'react-spinners';
import { updateProfile } from '../../../actions/user';

function getModalStyle(top, left) {
    return {
        top: `${top}%`,
        left: `${left}%`,
        transform: `translate(-${top}%, -${left}%)`,
    };
}

const useStyles = makeStyles((theme) => ({
    paper: {
        position: 'absolute',
        minWidth: 300,
        padding: 20,
        backgroundColor: theme.palette.background.paper,
        border: '2px solid white',
        borderRadius: 10,
        boxShadow: theme.shadows[5],
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
    },
    button: {
        marginLeft: 5,
        marginRight: 5
    },
    colorRed: {
        color: '#d44f4f',
    },
    paperXS: {
        borderRadius: 0,
        height: '100%',
        width: '80%',
        padding: 40
    }
}));


const ModalUpdateProfile = () => {
    const profile = useSelector(state => state.profile);
    const classes = useStyles();
    const [isUpdating, setIsUpdating] = useState(false);

    const [open, setOpen] = useState(false);
    const { updateProfileError: errorMessage } = useSelector(state => state.error);
    const dispatch = useDispatch();
    const [profileInfo, setProfileInfo] = useState({
        caption: profile.caption,
        lastname: profile.lastname,
        firstname: profile.firstname,
        username: profile.username
    });
    const { mode } = useSelector(state => state.layout);

    let top, left;
    if (mode === 'XS') {
        top = 0;
        left = 0;
    } else {
        top = 50;
        left = 50;
    }
    const [modalStyle] = useState(getModalStyle(top, left));
    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);

    };
    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(updateProfile(profile._id, profileInfo));
        setIsUpdating(true)
    }

    useEffect(() => {
        setIsUpdating(false);
        handleClose();
    }, [profile]);

    useEffect(() => {
        setIsUpdating(false)
    }, [errorMessage]);

    const body = (
        <Box style={modalStyle} className={mode === 'XS' ? `${classes.paper} ${classes.paperXS}` : classes.paper} >
            <Box className={classes.title} textAlign="center" my={2}>
                <Typography variant="h5" color="inherit" fontWeight="fontWeightBold" gutterBottom>Update your Profile</Typography>
            </Box>
            <Grid container direction="row" justify="center" alignItems="flex-start" style={{ width: '100%' }}>
                <form onSubmit={handleSubmit}>
                    <Grid item className={classes.details}   >
                        <Box width={1} mb={2}>
                            <TextField rows={3}
                                label="Story"
                                placeholder="Tell something about yourself..."
                                defaultValue={profile.caption}
                                multiline
                                variant="outlined"
                                inputProps={{ className: classes.textarea }}
                                style={{ width: '100%' }}
                                name="story"
                                onChange={e => setProfileInfo({ ...profileInfo, caption: e.target.value })}
                            />
                        </Box>
                        <Grid style={{ width: '100%' }} container direction="row" justify="space-between" alignItems="center">
                            <Grid item xs={12} sm={12} md={6}>
                                <TextField required className={classes.input} label="Last name" name="lastname" defaultValue={profile.lastname} onChange={e => setProfileInfo({ ...profileInfo, lastname: e.target.value })} />
                            </Grid>
                            <Grid item xs={12} sm={12} md={6}>
                                <TextField required className={classes.input} label="First name" name="firstname" defaultValue={profile.firstname} onChange={e => setProfileInfo({ ...profileInfo, firstname: e.target.value })} />
                            </Grid>
                            <Grid item xs={12} sm={12} md={6}>
                                <TextField className={classes.input} label="User name" placeholder="It can help others find you" autoComplete="off" name="username" defaultValue={profile.username} onChange={e => setProfileInfo({ ...profileInfo, username: e.target.value })} />
                            </Grid>
                        </Grid>
                        <Box my={1} ml={1}>
                            <Typography variant="subtitle2" className={classes.colorRed}>{errorMessage}</Typography>
                        </Box>
                        <Box width={1} mt={5} textAlign="center">
                            {
                                isUpdating ?
                                    (<>
                                        <BeatLoader color={"#5B9BD5"} size={15} css={"margin-bottom: 25px"} loading={true} />
                                    </>) : (<>
                                        <Button variant="contained" color="primary" type="submit" className={classes.button} >APPLY</Button>
                                        <Button variant="contained" color="default" onClick={handleClose} className={classes.button} >CANCEL</Button>
                                    </>)
                            }
                        </Box>
                    </Grid>
                </form>
            </Grid>
        </Box>
    );
    return (
        <div>
            <Button variant="contained" size="medium" style={{ backgroundColor: '#4d8bc5', color: 'white', fontWeight: 'bold' }} onClick={handleOpen} endIcon={<BorderColorIcon />} >
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