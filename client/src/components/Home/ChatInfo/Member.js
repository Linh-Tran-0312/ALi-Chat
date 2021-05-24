import { Avatar, Box, Grid, Typography } from '@material-ui/core';
import React from 'react';
import { useStyle } from './style';

const Member = (person) => {
    const classes = useStyle();

    return (
        <Box width={1} my={2}>
            <Grid container>
                <Grid item xs={3} align="center">
                    <Avatar alt={person.firstname}src={person.avatar} />
                </Grid>
                <Grid item xs={9} container direction="row"
                    justify="flex-start"
                    alignItems="center">
                    <Typography variant="body1">{`${person.firstname} ${person.lastname}`}</Typography>
                </Grid>
            </Grid>
        </Box>
    )
};

export default Member;