import { Accordion, AccordionDetails, AccordionSummary, Avatar, Box, Button, Grid, GridList,  Typography } from '@material-ui/core';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import PermContactCalendarIcon from '@material-ui/icons/PermContactCalendar';
import PhotoLibraryIcon from '@material-ui/icons/PhotoLibrary';
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace';
import AvatarGroup from '@material-ui/lab/AvatarGroup';
import CircularProgress from '@material-ui/core/CircularProgress';
import React, { useContext, useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearSearchMembers, searchMembers } from '../../../actions/user';
import { SocketContext } from '../../../context.socket';
import MemberSearch from '../ChatList/ModalCreateGroup/MemberSearch';
import Member from './Member';
import Thumbnail from './Thumbnail';
import useMediaQuery from '@material-ui/core/useMediaQuery';

const useStyles = makeStyles((theme) => ({
    title: {
        width: '100%',
        minHeight: 200,
        backgroundColor: 'white',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        color: '#71a8db'
    },
    details: {
        width: '100%',
        
        backgroundColor: 'white'
    },
    thumbnail_container : {
        display: 'flex',
        flexWrap: 'wrap',
        padding: '5px'
       
    },
    gridList: {
        width: '100%',
        height: '100%',
       
    },
    chatinfo: {
        height: '100vh',
        width: '25%',
        minWidth: '300px',
        overflow: 'scroll',
        backgroundColor: 'white',
        '&::-webkit-scrollbar': {
            width: '5px',

        },
        '&::-webkit-scrollbar-track': {
            backgroundColor: '#f2f4ff'
        },
        '&::-webkit-scrollbar-thumb': {
            backgroundColor: '#b7bcd4',
            borderRadius: '5px'
        },
        '&::-webkit-scrollbar-thumb:hover': {
            backgroundColor: '#555',
        }
    },
    chatinfoSM: {
        width: '300px',
    },
    chatinfoXS: {
        width: '100%',
    }
}));

const StyledAvaGroup = withStyles(() => ({
    root: {
        '& .MuiAvatarGroup-avatar': {
            width: 60,
            height: 60
        }
    }
}))(AvatarGroup);

const StyledAccordion = withStyles(() => ({
    root: {
        "&$expanded": {
            margin: "auto"
        }
    },
    expanded: {}
}))(Accordion)

const ChatInfo = () => {
    console.log("CHAT INFO RENDER");
    const userId = JSON.parse(localStorage.getItem('profile')).result._id;
    const { mode } = useSelector(state => state.layout);
    const matchMD = mode === 'MD';

    const conversation = useSelector(state => state.conversation);
    const attachments = conversation?.attachments;
    const classes = useStyles();
    const dispatch = useDispatch();
    const socket = useContext(SocketContext);

    const [ memberResults, setMemberResults ] = useState([]);
    const [searchMem, setSearchMem] = useState("");
    const [expandedMember, setExpandedMember] = useState('member');
    const [expandedPhoto, setExpandedPhoto] = useState('photo');
    const [ isRemoving, setIsRemoving ] = useState(false);

    const addMember = (member) => {
        if (!conversation.people.find(person => person === member._id)) {
            conversation.people.push(member._id);
            socket.emit('addMember', { conversationId: conversation._id, people: conversation.people, userId: member._id })
        }
    };

    const removeMember = (memberId) => {
        console.log(memberId)
        const people = conversation.people.filter(member => member !== memberId)
        socket.emit('removeMember', { conversationId: conversation._id, people, userId: memberId, isRemoved: true })
    }

    const leaveGroup = () => {
        setIsRemoving(true);
        const people = conversation.people.filter(member => member !== userId)
        socket.emit('removeMember', { conversationId: conversation._id, people, userId, isRemoved: false })
    }

    const handleSearchMem = (formData) => {
        setSearchMem(formData.searchMem);
    }
    const handleBackFromChatInfo = () => {
        dispatch({ type: 'VIEW_CHATFEED'})
    }

    useEffect(async() => {
        const formData = { searchMem }
        if (!formData.searchMem) {
            dispatch(clearSearchMembers())
        } else {
            const list = await searchMembers(formData);
            setMemberResults(list)
        }
    },[searchMem]);

    const handleChangeMember = (panel) => (event, newExpanded) => {
        setExpandedMember(newExpanded ? panel : false);
    };
    const handleChangePhoto = (panel) => (event, newExpanded) => {
        setExpandedPhoto(newExpanded ? panel : false);
    };

    useEffect(() => {
        setExpandedMember(false);
        setExpandedPhoto(false);
        dispatch(clearSearchMembers());
        setIsRemoving(false);
        setMemberResults([]);
    }, [conversation]);

    let css = '';
    switch(mode) {
        case 'LG':
            css = classes.chatinfo;
            break;
        case 'XS':
            css = `${classes.chatinfo} ${classes.chatinfoXS}`;
            break;
        default:
            css = `${classes.chatinfo} ${classes.chatinfoSM}`;
    }
    if (conversation)
        return (
            <Box className={css}>
                {
                    mode === 'XS' &&  <Box my={2} mx={3}><Button onClick={handleBackFromChatInfo} variant="contained" color="default" size="small" startIcon={<KeyboardBackspaceIcon />}>Back</Button>
                    </Box> 
                }
                <Box className={classes.title}>
                    <StyledAvaGroup max={4} spacing="small">
                        {
                            conversation?.peopleInfo?.map((person, index) => <Avatar key={index} alt={person.firstname} src={person.avatar} />)
                        }
                    </StyledAvaGroup>
                    <Box my={2} px={2}>
                        <Typography variant="h5" color="inherit">
                            {
                                conversation.name ? `${conversation.name}` :
                                    `${conversation?.peopleInfo[0]?.firstname} and ${conversation?.peopleInfo[1]?.firstname}`
                            }
                        </Typography>
                    </Box>
                </Box>
                <Box className={classes.details}>
                    {
                        conversation?.name ? (
                            <StyledAccordion square classes={{ expanded: classes.expanded }} expanded={expandedMember === 'member'} onChange={handleChangeMember('member')}>
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="panel1a-content"
                                    id="panel1a-header"
                                >
                                    <PermContactCalendarIcon color="action" /> &nbsp;
                                    <Typography variant="body1" color="textPrimary" gutterBottom>Members</Typography>
                                </AccordionSummary>
                                <AccordionDetails >
                                    <div style={{ width: '100%', textAlign: 'center' }}>
                                        {
                                            conversation.host === userId &&
                                            (<Box width="100%" textAlign="left" mb={2}>
                                                <MemberSearch list={memberResults} handleSearchMem={handleSearchMem} selectMember={addMember} searchWidth="100%" resultWidth="100%" />
                                            </Box>)
                                        }
                                        {
                                            conversation.peopleInfo?.map((person, index) =>
                                                <Member key={index} person={person} hostId={conversation.host} removeMember={removeMember} />
                                            )
                                        }
                                        {
                                            conversation.host !== userId ? 
                                            (<Box my={2}>
                                                {
                                                    isRemoving ? <CircularProgress color="secondary" size={20}/> : <Button variant="contained" size="small" color="secondary" onClick={leaveGroup} endIcon={<ExitToAppIcon />}>Leave Group</Button>
                                                }
                                            </Box>) : null
                                        }
                                    </div>
                                </AccordionDetails>
                            </StyledAccordion>
                        ) : null
                    }
                    <StyledAccordion square classes={{ expanded: classes.expanded }} expanded={expandedPhoto === 'photo'} onChange={handleChangePhoto('photo')}>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel2a-content"
                            id="panel2a-header"
                        >
                            <PhotoLibraryIcon color="action" /> &nbsp;
                            <Typography variant="body1" color="textPrimary" gutterBottom>Photos</Typography>
                        </AccordionSummary>
                        <AccordionDetails >
                          {/*   <Grid container wrap="wrap" style={{ width: '100%' }} >
                                { [...attachments].reverse().map((attachment, index) => <Thumbnail key={index} url={attachment} />)}
                            </Grid> */}
                             <ul className={classes.thumbnail_container}>
                           
                            { [...attachments].reverse().map((attachment, index) => <Thumbnail key={index} url={attachment} />)}

                            
                            </ul>
                        </AccordionDetails>
                    </StyledAccordion>
                </Box>
            </Box>
        )
    return (
        <Box className={classes.chatinfo}></Box>
    )
}

export default ChatInfo