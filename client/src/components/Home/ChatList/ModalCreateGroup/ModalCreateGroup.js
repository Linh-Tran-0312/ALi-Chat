import { Box, Button, Modal, TextField, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { GroupAdd as GroupAddIcon } from '@material-ui/icons';
import React, { useContext, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import RiseLoader from 'react-spinners/RiseLoader';
import { clearSearchMembers, searchMembers } from '../../../../actions/user';
import { SocketContext } from '../../../../context.socket';
import MemberAdd from './MemberAdd';
import MemberSearch from './MemberSearch';
 

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
    width: 600,
    height: 350,
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
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },

}));




export default function SimpleModal() {
  const userId = JSON.parse(localStorage.getItem('profile'))?.result?._id;
  const classes = useStyles();
  const dispatch = useDispatch();
  const socket = useContext(SocketContext)
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);
  const [members, setMembers] = useState([]);
  const [groupName, setGroupName] = useState("");
  const [searchMem, setSearchMem] = useState("");
  const [warning, setWarning] = useState("");
  const [isCreating, setIsCreating] = useState(false)


  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleDelete = (index) => {
    const newMembers = [...members.slice(0, index), ...members.slice(index + 1)]
    setMembers(newMembers);
  }

  const handleSearchMem = (formData) => {
    setSearchMem(formData.searchMem);
  }

  useEffect(() => {
    const formData = { searchMem }
    if (!formData.searchMem) {
      dispatch(clearSearchMembers())
    } else {
      dispatch(searchMembers(formData));
    }


  }, [searchMem])

  const selectMember = (newMember) => {
    const existingMember = members.find(member => member._id === newMember._id);
    if (!existingMember) {
      setMembers([...members, newMember])
    };
    setWarning("")
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (members.length === 0) {
      setWarning("Please add members before creating group chat !")
    } else {
      const membersId = members.map(member => member._id)
      const formData = {
        people: [...membersId, userId],
        host: userId,
        name: groupName
      }
      socket.emit('createGroupChat', formData);
      setIsCreating(true)

    }
  }
  useEffect(() => {
    socket.on('message', data => {
      setIsCreating(false)
      setSearchMem("");
      setGroupName("");
      setMembers([]);
      handleClose();
    })
  }, [socket])
  const body = (
    <form style={modalStyle} className={classes.paper} onSubmit={handleSubmit} method="get">

      {
        isCreating ? 
        ( <>
        <RiseLoader color="#5B9BD5" size="15"  css="margin-bottom: 25px"loading={true}/>
        <Typography variant="h6" color="primary">Creating Group Chat...</Typography>
        </>
        ) :
          (
            <>
              <Box mb={4} mt={2}>
                <Typography variant="h3" color="primary">More mems, more fun !</Typography>
              </Box>
              <Box width={1} className={classes.inputcontainer}>
                <Box className={classes.input} mx={1}>
                  <Box mb={2}>
                    <Typography variant="subtitle2" color="primary">Group Name</Typography>
                    <TextField type="text" placeholder="Enter the name" name="name" onChange={(e) => setGroupName(e.target.value)} variant="outlined" size="small" required />
                  </Box>
                  <MemberSearch handleSearchMem={handleSearchMem} selectMember={selectMember} />
                </Box>
                <MemberAdd members={members} handleDelete={handleDelete} warning={warning} />
              </Box>
              <Box my={3}>
                <Button variant="contained" color="primary" type="submit" >CREATE</Button>
              </Box>
            </>
          )
      }

    </form>
  );

  return (
    <div>
      <Button variant="contained" size="medium" color="primary" onClick={handleOpen} startIcon={<GroupAddIcon fontSize="large" />} >
        Create group chat
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
