import { Avatar, Box, Grid, Typography,Accordion, AccordionDetails, AccordionSummary } from '@material-ui/core';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import PermContactCalendarIcon from '@material-ui/icons/PermContactCalendar';
import PhotoLibraryIcon from '@material-ui/icons/PhotoLibrary';
import AvatarGroup from '@material-ui/lab/AvatarGroup';
import React from 'react';
import { useSelector } from 'react-redux';
import Member from './Member';
import Thumbnail from './Thumbnail';


const useStyles = makeStyles((theme) => ({
    title: {
        width: '100%',
        height: '30%',
        backgroundColor: '#f2f2f2',
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
        backgroundColor: '#f2f2f2'
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
    const conversation = useSelector(state => state.conversation);
    if (conversation)
        return (

            <Box className={classes.chatinfo}>
                <Box className={classes.title}>
                    <StyledAvaGroup max={4} spacing="small">
                        {
                            conversation?.peopleInfo?.map(person => <Avatar alt={person.firstname} src={person.avatar} />)
                        }

                    </StyledAvaGroup>
                    <Box my={2}>
                        <Typography variant="h5" color="primary">
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
                            <StyledAccordion square classes={{ expanded: classes.expanded }}>
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="panel1a-content"
                                    id="panel1a-header"
                                >
                                    <PermContactCalendarIcon color="action" /> &nbsp;
                       <Typography variant="body1" color="textPrimary" gutterBottom>Members</Typography>
                                </AccordionSummary>
                                <AccordionDetails >
                                    <div style={{ width: '100%' }}>
                                        {
                                            conversation.peopleInfo?.map((person, index) => {
                                                if (person._id === conversation.host) {
                                                    return <Member key={index} person={person} isHost={true} />;
                                                }
                                                else {
                                                    return <Member key={index} person={person} />
                                                }
                                            })
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
                              { conversation.attachments.map( (attachment,index) => <Thumbnail key={index} url={attachment}/>)}
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