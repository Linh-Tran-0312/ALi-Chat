import { Box, IconButton, InputAdornment, TextField, Typography } from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';
import ClearAll from '@material-ui/icons/ClearAll';
import GroupAddIcon from '@material-ui/icons/GroupAdd';
import React, { useEffect, useRef, useState } from 'react';
import Avatar from '../../../../components/Avatar';

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
    const [ isAdding, setIsAdding ] = useState(false);

    const handleSelectMember = () => {
        selectMember(member);
        setIsAdding(true);
    }

    useEffect(() => {
         setIsAdding(false);
     },[member]);

    return (
        <Box px={3} className={classes.member} >
            <Box  className={classes.memberInfo}>
                <Avatar url={member.avatar} size={20} />
                <Typography variant="body2" >&nbsp;&nbsp;{`${member.firstname} ${member.lastname}`}</Typography>
            </Box>
            <IconButton size="small" component="span"  onClick={handleSelectMember}>
                {
                    isAdding ? <CircularProgress color="primary" size={20}/> :  <GroupAddIcon fontSize="small" style={{  color: '#5B9BD5'}}/>
                }
               
            </IconButton>
        </Box>
    )
}

const MemberSearch = ({ list, clear, handleSearchMem, selectMember, resultWidth, searchWidth }) => {

    const classes = useStyles();
    const [ searchTerm, setSearchTerm ] = useState("");
    const typingTimeoutRef = useRef(null);
     
    const handleChange = (e) => {
        const value = e.target.value;
        setSearchTerm( e.target.value);
        if (typingTimeoutRef.current) {
            clearTimeout(typingTimeoutRef.current);
        }

        typingTimeoutRef.current = setTimeout(() => {
            const searchMem = value.replace(new RegExp(/^\s+/), "").replace(new RegExp(/^\s$/), "");
            if(!!searchMem) {
            const formData = { searchMem };
            handleSearchMem(formData);
           }
        
        }, 500);
    }
    const handleClear = () => {
        setSearchTerm("");
        clear();
    }
    return (
        <Box mb={1} width="100%" style={{ position: 'relative' }}>
            <Box mb={1}>
                <Typography variant="subtitle2" color="primary">Add Members</Typography>
            </Box>
            <TextField
                placeholder="Type your friend's name"
                name="search_mem" variant="outlined"
                size="small"
                value={searchTerm}
                onChange={handleChange}
                autoComplete="off"
                style={{ width: searchWidth }}
                InputProps={{
                    endAdornment: (
                        <InputAdornment position="end" >
                            <IconButton onClick={handleClear} edge="end">
                              <ClearAll color="action" />
                            </IconButton>                           
                        </InputAdornment>
                    )
                }}
            />
            <Box className={`${list.length !== 0  ? classes.memberResults : null}`} style={{ width: resultWidth }}>
                {
                    list.map((member, index) => <Member key={index} member={member} selectMember={selectMember} />)
                }
            </Box>
        </Box>
    )
}

export default MemberSearch