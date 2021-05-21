import { Avatar, Box, Grid, Typography } from '@material-ui/core';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import PermContactCalendarIcon from '@material-ui/icons/PermContactCalendar';
import PhotoLibraryIcon from '@material-ui/icons/PhotoLibrary';
import React from 'react';
import Member from './Member';
import { StyledAccordion, StyledAvaGroup, useStyle } from './style';
import Thumbnail from './Thumbnail';


const ChatInfo = () => {
    const classes = useStyle();
    return (
        <Box className={classes.chatinfo}>
            <Box className={classes.title}>
                <StyledAvaGroup max={4} spacing="small">
                    <Avatar alt="Remy Sharp" src="NV_1.jpg" />
                    <Avatar alt="Travis Howard" src="NV_2.jpg" />
                    <Avatar alt="Cindy Baker" src="NV_3.jpg" />
                    <Avatar alt="Agnes Walker" src="DSC_0913" />
                    <Avatar alt="Trevor Henderson" src="DSC_0874" />
                </StyledAvaGroup>
                <Box my={2}>
                    <Typography variant="h5" color="primary">Hội Bà Tám</Typography>
                </Box>

            </Box>
            <Box className={classes.details}>
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
                        <Member />
                     <Member />
                     <Member />
                     <Member />
                     <Member />
                     <Member />
                        </div>
                 
                    </AccordionDetails>
                </StyledAccordion>
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