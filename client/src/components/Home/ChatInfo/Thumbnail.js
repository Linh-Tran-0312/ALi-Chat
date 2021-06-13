import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import ImageModal from '../ImageModal';
  const useStyles = makeStyles((theme) => ({
    thumbnail: {
        objectFit: 'cover',
         height: 100,
        width: 100,
    } 
}))


const Thumbnail = ({ url }) => {
    const classes = useStyles();
    return (
        <Grid item xs={12} md={4} sm={6}>
           <ImageModal url={url} minWidth="100px" minHeight="100px" maxWidth="100px" maxHeight="100px"/>
        </Grid>
    )
};

export default Thumbnail;