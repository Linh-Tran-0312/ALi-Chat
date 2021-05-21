import React from 'react';
import { Grid } from '@material-ui/core';
import { useStyle } from './style';

const Thumbnail = () => {
    const classes = useStyle();

    return (
        <Grid item xs={6} sm={4}>
            <img  src="/DSC_0913.jpg" className={classes.thumbnail}/>
        </Grid>
    )
};

export default Thumbnail;