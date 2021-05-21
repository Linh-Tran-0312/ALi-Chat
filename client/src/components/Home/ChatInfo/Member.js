import { Avatar, Box, Grid, Typography } from '@material-ui/core';
import React from 'react';
import { useStyle } from './style';

const Member = () => {
    const classes = useStyle();

    return (
        <Box width={1} my={2}>
            <Grid container>
                <Grid item xs={3} align="center">
                    <Avatar alt="Cindy Baker" src="NV_3.jpg" />
                </Grid>
                <Grid item xs={9} container direction="row"
                    justify="flex-start"
                    alignItems="center">
                    <Typography variant="body1">Cindy Baker</Typography>
                </Grid>
            </Grid>
        </Box>
    )
};

export default Member;