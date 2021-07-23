import { Box, Button, Modal, TextField, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { GroupAdd as GroupAddIcon } from '@material-ui/icons';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BeatLoader } from 'react-spinners';
import { searchMembers } from '../../../../actions/user';
import getSocket from '../../../../socket';
import { emitCreateGroupChat } from '../../socket';
import MemberAdd from './MemberAdd';
import MemberSearch from './MemberSearch';

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
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start'
  },
  input: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  button: {
    margin: theme.spacing(1),
  },
  paperXS: {
    borderRadius: 0,
    height: '100%',
    width: '80%',
    padding: 40
  }
}));


export default function SimpleModal() {
  const userId = JSON.parse(localStorage.getItem('profile'))?.result?._id;

  const [open, setOpen] = useState(false);

  const [members, setMembers] = useState([]);
  const [groupName, setGroupName] = useState("");

  const [searchMem, setSearchMem] = useState("");

  const [warning, setWarning] = useState("");
  const [isCreating, setIsCreating] = useState(false);
  const [memberResults, setMemberResults] = useState([]);
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

  const classes = useStyles();
  const dispatch = useDispatch();
  
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
  const handleClear = () => {
    setMemberResults([])
  }
  useEffect(() => {
    (async () => {
      const formData = { searchMem }
      if (!formData.searchMem) {
        setMemberResults([]);
      } else {
        const list = await searchMembers(formData);
        setMemberResults(list);
      }
    })();
  }, [searchMem])

  const selectMember = (newMember) => {
    const existingMember = members.find(member => member._id === newMember._id);
    if (!existingMember) {
      setMembers([...members, newMember])
    };
    const updatedMemberResults = memberResults.filter(member => member._id !== newMember._id);
    setMemberResults(updatedMemberResults);
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
      emitCreateGroupChat(formData);
      setIsCreating(true)
    }
  }

  useEffect(() => {
    getSocket()?.on('succeedInCreateNewConversation', () => {
      setIsCreating(false)
      setSearchMem("");
      setGroupName("");
      setMembers([]);
      handleClose();
    })
  }, []);

  const body = (
    <form style={modalStyle} className={mode === 'XS' ? `${classes.paper} ${classes.paperXS}` : classes.paper} onSubmit={handleSubmit} method="get">
      <Box mb={4} mt={2}>
        <Typography variant="h3" color="primary">More mems, more fun !</Typography>
      </Box>
      <Box width={1} className={classes.inputcontainer}>
        <Box className={classes.input} mx={1}>
          <Box mb={2} width={1}>
            <Box mb={1}>
              <Typography variant="subtitle2" color="primary">Group Name</Typography>
            </Box>
            <TextField style={{ width: '100%' }} type="text" placeholder="Enter the name" name="name" onChange={(e) => setGroupName(e.target.value)} variant="outlined" size="small" required />
          </Box>
          <MemberSearch list={memberResults} handleSearchMem={handleSearchMem} selectMember={selectMember} clear={handleClear} searchWidth="100%" resultWidth="100%" />
          <MemberAdd members={members} handleDelete={handleDelete} warning={warning} />
        </Box>
      </Box>
      <Box my={3}>
        {
          isCreating ?
            (<>
              <BeatLoader color={"#5B9BD5"} size={15} css={"margin-bottom: 25px"} loading={true} />
            </>) : (<>
              <Button variant="contained" color="primary" type="submit" className={classes.button} >CREATE</Button>
              <Button variant="contained" color="default" onClick={handleClose} className={classes.button} >CANCEL</Button>
            </>)
        }
      </Box>
    </form>
  );

  return (
    <div>
      <Box mx={2}>
        <Button variant="contained" style={{ backgroundColor: '#71a8db', color: 'white', fontWeight: 'bold' }} onClick={handleOpen} startIcon={<GroupAddIcon fontSize="large" />} >
          Create group chat
        </Button>
      </Box>
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
