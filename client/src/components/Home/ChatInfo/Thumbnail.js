import { Grid, Box, GridListTile } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import ImageModal from '../ImageModal';

const useStyles = makeStyles(() => ({
    grid : {
        margin: '3px',
        height: '15vh',
        maxWidth: '45%',
        flexGrow: 1,
        display: 'flex',
        flex: 'row',
        listStyle: 'none',
        '&:last-child': {
            // There's no science in using "10" here. In all my testing, this delivered the best results.
            flexGrow: 10
    }
}}))
const Thumbnail = ({ url }) => {
        const classes = useStyles();
    return (
      /*   <Grid item className={classes.grid}>   
            
                <ImageModal url={url} minWidth="10%" minHeight="50px" maxWidth="100%" maxHeight="100%" />
               
        </Grid> */
         <li className={classes.grid}  > 
      
             <ImageModal url={url} minWidth="100%" minHeight="100%" maxWidth="100%" maxHeight="100%" />
    
       </li>
    )
};

export default Thumbnail;