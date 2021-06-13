import { Box, TextField, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import React, { useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import Avatar from '../../../Home/Avatar';

const useStyles = makeStyles(() => ({
    memberResults: {
        marginTop: 10,

        width: '216px',
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
        width: "182px",
        height: 35,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        '&:hover': {
            backgroundColor: '#dfe5ff',
            cursor: 'pointer',

        },
        paddingLeft: 10,
        paddingTop: 5,
        paddingBottom: 5
    }
}))

const Member = ({ member, selectMember }) => {
    const classes = useStyles();
    const handleSelectMember = () => {
        selectMember(member)
    }
    return (
        <Box px={3} className={classes.member} onClick={handleSelectMember}>
            <Avatar url={member.avatar} width={25} height={25} />
            <Typography variant="body2" >&nbsp;&nbsp;{`${member.firstname} ${member.lastname}`}</Typography>
        </Box>
    )
}
const MemberSearch = ({ handleSearchMem, selectMember }) => {
    const classes = useStyles();
    const typingTimeoutRef = useRef(null);
    const memberResults = useSelector(state => state.members);
    const [close, setClose] = useState(false);
    /*     const [anchorEl, setAnchorEl] = React.useState(null);
     */
    /*    const handleClick = (e) => {
         setAnchorEl(e.currentTarget);
       };
     
       const handleClose = () => {
         setAnchorEl(null);
       };
      */
    /*     const open = Boolean(anchorEl);
        const id = open ? 'simple-popover' : undefined; */

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

    return (
        <Box mb={1} >
            <Typography variant="subtitle2" color="primary">Add Members</Typography>
            <TextField
                type="search"
                placeholder="Type your friend's name"
                name="search_mem" variant="outlined"
                size="small"
                onChange={handleChange}
                autoComplete="off"
            />
            <Box className={`${memberResults.length !== 0 ? classes.memberResults : null}`}>
                {
                    memberResults.map((member, index) => <Member key={index} member={member} selectMember={selectMember} />)
                }
            </Box>
        </Box>
    )
}

export default MemberSearch