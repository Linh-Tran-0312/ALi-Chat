import { Accordion, AccordionDetails, AccordionSummary, Avatar, Box, Button, Grid, Typography } from '@material-ui/core';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import PermContactCalendarIcon from '@material-ui/icons/PermContactCalendar';
import PhotoLibraryIcon from '@material-ui/icons/PhotoLibrary';
import AvatarGroup from '@material-ui/lab/AvatarGroup';
import React, { useEffect, useState, useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateConversation } from '../../../actions/chat';
import { clearSearchMembers, searchMembers } from '../../../actions/user';
import MemberSearch from '../ChatList/ModalCreateGroup/MemberSearch';
import Member from './Member';
import Thumbnail from './Thumbnail';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { SocketContext } from '../../../context.socket'; 

const useStyles = makeStyles((theme) => ({
    title: {
        width: '100%',
        height: '30%',
        backgroundColor: 'white',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',

    },
    details: {
        width: '100%',
        height: '70%',
        backgroundColor: 'white'
    },
    chatinfo: {
        height: '100vh',
        width: '25%',
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
    const classes = useStyles();
    const dispatch = useDispatch();
    const conversation = useSelector(state => state.conversation);
    const socket = useContext(SocketContext);
    const userId = JSON.parse(localStorage.getItem('profile')).result._id;
    const [searchMem, setSearchMem] = useState("");
    const [expanded, setExpanded] = useState('member');
    // Chom
    const addMember = (member) => {
         if(!conversation.people.find(person => person == member._id)) {
             conversation.people.push(member._id);
             socket.emit('addMember', {conversationId: conversation._id, people : conversation.people, userId: member._id}) 
            // dispatch(updateConversation({ _id: conversation._id, people: conversation.people}));
         }
    };

    const removeMember = (memberId) => {
        console.log(memberId)
        const people = conversation.people.filter(member => member !== memberId)
        socket.emit('removeMember', {conversationId: conversation._id, people , userId: memberId, isRemoved: true}) 
        //dispatch(updateConversation({_id: conversation._id, people}))
    }

    const leaveGroup = () => {
        const people = conversation.people.filter(member => member !== userId)
        socket.emit('removeMember', {conversationId: conversation._id, people , userId, isRemoved: false}) 
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
      }, [searchMem]);

      const handleChange = (panel) => (event, newExpanded) => {
        setExpanded(newExpanded ? panel : false);
      };
      
      useEffect(() => {
           setExpanded(false);
           dispatch(clearSearchMembers())
      },[conversation])

    if (conversation)
        return (

            <Box className={classes.chatinfo}>
                <Box className={classes.title}>
                    <StyledAvaGroup max={4} spacing="small">
                        {
                            conversation?.peopleInfo?.map((person, index) => <Avatar key={index} alt={person.firstname} src={person.avatar} />)
                        }

                    </StyledAvaGroup>
                    <Box my={2}>
                        <Typography variant="h5" color="primary">
                            {
                                conversation.name ? `Group: ${conversation.name}` :
                                    `${conversation?.peopleInfo[0]?.firstname} and ${conversation?.peopleInfo[1]?.firstname}`
                            }
                        </Typography>
                    </Box>
                </Box>
                <Box className={classes.details}>
                    {
                        conversation?.name ? (
                            <StyledAccordion square classes={{ expanded: classes.expanded }} expanded={expanded === 'member'} onChange={handleChange('member')}>
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
                                            conversation.host === userId && (  <Box width="100%" textAlign="left" mb={2}>
                                                                                    <MemberSearch handleSearchMem={handleSearchMem} selectMember={addMember} searchWidth="100%" resultWidth="100%" />
                                                                                </Box>)
                                        }
                                      
                                        {
                                            conversation.peopleInfo?.map((person, index) =>                                                 
                                                  <Member key={index} person={person} hostId={conversation.host} kickMember={removeMember} />                                         
                                           )
                                        }
                                        {
                                             conversation.host !== userId ?      ( <Box my={2}>
                                                                                    <Button variant="contained" size="small" color="secondary" onClick={leaveGroup} endIcon={<ExitToAppIcon />}>Leave Group</Button>
                                                                                    </Box>) : null
                                        }
                                  
                                    </div>
                                </AccordionDetails>
                            </StyledAccordion>
                        ) : null
                    }
                    <StyledAccordion square>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel2a-content"
                            id="panel2a-header"
                        >
                            <PhotoLibraryIcon color="action" /> &nbsp;
                            <Typography variant="body1" color="textPrimary" gutterBottom>Photos</Typography>
                        </AccordionSummary>
                        <AccordionDetails >
                            <Grid container style={{ width: '100%' }}>
                                {conversation.attachments.map((attachment, index) => <Thumbnail key={index} url={attachment} />)}
                            </Grid>
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