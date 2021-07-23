import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import ImageModal from '../../../components/ImageModal';

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
            flexGrow: 10
    }
}}))

const Thumbnail = ({ url }) => {
        const classes = useStyles();
    return (
         <li className={classes.grid}  >    
             <ImageModal url={url} minWidth="100%" minHeight="100%" maxWidth="100%" maxHeight="100%" />
       </li>
    )
};

export default Thumbnail;