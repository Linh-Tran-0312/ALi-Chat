import { Grid, Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import ImageModal from '../ImageModal';


const Thumbnail = ({ url }) => {

    return (
        <Grid item xs={12} lg={3} md={4} sm={6}  spacing={3}>
            
            <ImageModal url={url} minWidth="50px" minHeight="80px" maxWidth="95%" maxHeight="80px" />

    

        </Grid>
    )
};

export default Thumbnail;