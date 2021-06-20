import { Box, TextField, Typography, IconButton } from '@material-ui/core';
import GroupAddIcon from '@material-ui/icons/GroupAdd';
import { makeStyles } from '@material-ui/core/styles';
import React, { useRef, useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Avatar from '../../../Home/Avatar';
import { clearSearchMembers } from '../../../../actions/user';

const useStyles = makeStyles(() => ({
    memberResults: {
        marginTop: 10,
        maxHeight: '150px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        backgroundColor: 'white',
        border: '1px solid #949494',
        borderRadius: 5,
        position: 'absolute',
        overflow: 'auto',
        zIndex: 1000
    },
    close: {
        display: 'none',
    },
    member: {
        width: "calc(100% - 34px)",
        height: 35,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        /*   '&:hover': {
              backgroundColor: '#dfe5ff',
              cursor: 'pointer',
  
          }, */
        paddingLeft: 10,
        paddingTop: 5,
        paddingBottom: 5
    },
    memberInfo :{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    icon: {
        diplay: 'flex',
        flexDirection: 'row',
        justifyContent: 'center'
    }
}))

const Member = ({ member, selectMember }) => {
    const classes = useStyles();
    const handleSelectMember = () => {
        selectMember(member)
    }
    return (
        <Box px={3} className={classes.member} >
            <Box  className={classes.memberInfo}>
                <Avatar url={member.avatar} width={25} height={25} />
                <Typography variant="body2" >&nbsp;&nbsp;{`${member.firstname} ${member.lastname}`}</Typography>
            </Box>
            <IconButton size="small" component="span">
            <GroupAddIcon fontSize="small" onClick={handleSelectMember} style={{  color: '#5B9BD5'}}/>
        </IconButton>
           

        </Box>
    )
}
const MemberSearch = ({ handleSearchMem, selectMember, resultWidth, searchWidth }) => {
    const classes = useStyles();
    const typingTimeoutRef = useRef(null);
    const memberResults = useSelector(state => state.members);
     
    const dispatch = useDispatch();

    const handleChange = (e) => {
        const value = e.target.value;

        if (typingTimeoutRef.current) {
            clearTimeout(typingTimeoutRef.current);
        }

        typingTimeoutRef.current = setTimeout(() => {
            const formData = {
                searchMem: value
            };
            handleSearchMem(formData);
        }, 500);
    }
    

    /* useEffect(() => {
        return () => {
            dispatch(clearSearchMembers());
        }
    },[]); */
    return (
        <Box mb={1} width="100%" style={{ position: 'relative' }}>
            <Box mb={2}>
                <Typography variant="subtitle2" color="primary">Add Members</Typography>
            </Box>
            <TextField
                type="search"
                placeholder="Type your friend's name"
                name="search_mem" variant="outlined"
                size="small"
                onChange={handleChange}
                autoComplete="off"
                style={{ width: searchWidth }}
            />
            <Box className={`${memberResults.length !== 0  ? classes.memberResults : null}`} style={{ width: resultWidth }}>
                {
                    memberResults.map((member, index) => <Member key={index} member={member} selectMember={selectMember} />)
                }
            </Box>
        </Box>
    )
}

export default MemberSearch