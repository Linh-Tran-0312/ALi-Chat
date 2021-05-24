import { Avatar, Box, Grid, Typography } from '@material-ui/core';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import PermContactCalendarIcon from '@material-ui/icons/PermContactCalendar';
import PhotoLibraryIcon from '@material-ui/icons/PhotoLibrary';
import React from 'react';
import { useSelector } from 'react-redux';
import Member from './Member';
import { StyledAccordion, StyledAvaGroup, useStyle } from './style';
import Thumbnail from './Thumbnail';


const ChatInfo = () => {
    const classes = useStyle();
    const conversation = useSelector(state => state.conversation);
    return (
        <Box className={classes.chatinfo}>
            <Box className={classes.title}>
                <StyledAvaGroup max={4} spacing="small">
                    {
                        conversation?.peopleInfo?.map(person => <Avatar alt={person.firstname} src={person.avatar} /> )
                    }
                    
                </StyledAvaGroup>
                <Box my={2}>
                    <Typography variant="h5" color="primary">
                    {
                        conversation.name ? `${conversation.name}` : 
                        `${conversation?.peopleInfo[0]?.lastname} and ${conversation?.peopleInfo[1]?.lastname}`
                    }
                    </Typography>
                </Box>

            </Box>
            <Box className={classes.details}>
                {
                    conversation?.name  ? (
                        <StyledAccordion square classes={{ expanded: classes.expanded}}>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                        >
                        <PermContactCalendarIcon  color="action"/> &nbsp;
                       <Typography   variant="body1" color="textPrimary" gutterBottom>Members</Typography>
                        </AccordionSummary>
                        <AccordionDetails >
                            <div style={{width : '100%'}}>
                          {
                              conversation.peopleInfo?.map(person => <Member {...person} />)
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
                        <PhotoLibraryIcon   color="action"/> &nbsp;
                        <Typography   variant="body1" color="textPrimary" gutterBottom>Photos</Typography>
                    </AccordionSummary>
                    <AccordionDetails >
                    <Grid container style={{width : '100%'}}>
                        <Thumbnail />
                        <Thumbnail />
                        <Thumbnail />
                        <Thumbnail />
                        <Thumbnail />
                        <Thumbnail />
                        <Thumbnail />
                        <Thumbnail />
                        <Thumbnail />
                        <Thumbnail />
                        <Thumbnail />
                        <Thumbnail />
                        <Thumbnail />
                        <Thumbnail />
                        <Thumbnail />
                        <Thumbnail />
                        <Thumbnail />
                        <Thumbnail />
                        <Thumbnail />
                        <Thumbnail />
                        <Thumbnail />
                        <Thumbnail />
                        <Thumbnail />
                        <Thumbnail />

                        </Grid>
                    </AccordionDetails>
                </StyledAccordion>
            </Box>
        </Box>

    )
}

export default ChatInfo