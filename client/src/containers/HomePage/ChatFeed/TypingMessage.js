import { Box, Grid, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import { useSelector } from 'react-redux';
import { BeatLoader } from 'react-spinners';
import Avatar from '../../../components/Avatar';

const useStyles = makeStyles(() => ({
    message_avatar: {
        width: '100%',
        height: '100%',
        minHeight: 50,
        padding: 10,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    theirmessage_box: {
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'flex-start'
    }, 
    message_hidden: {
        visibility: 'hidden',
        padding: 10,
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    theirmessage_content_box: {
        width: 80,
        height: 40,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        borderRadius: "20px",    
        position: 'relative',
        top: '5px',
        
    }, 
    theirmessage_content: {
        maxWidth: '60%',
        width: 40,
        height: 55,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'flex-start',
     
        borderRadius: "17px",
        backgroundColor: 'white',
        fontFamily: 'Open Sans',
        wordBreak: 'break-word'
    }, 
    message: {
        minHeight: 50,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
    },
    avatar: 
    { "&&" :{
        height: '15px',
        color: "#474646"
      }},
  
    loader : {
        position: 'relative',
        top: 25,
    },
    xs : {
        left: '5px',
        top: '2px'
    }
}));


const TypingMessage = ({ userId, avatar}) => {

    const classes = useStyles();
    const { mode } = useSelector(state => state.layout);
    const matchXS = mode === 'XS';
    
    return (
            <Box width="100%" className={classes.message} my={1} >
                <Grid container style={{ minHeight: 50 }}direction="row" justify="center" alignItems="flex-start" >
                    <Grid item xs={1} className={classes.message_avatar}>
                        <Avatar url={avatar} userId={userId} size={matchXS ? 25 : 35} type={2} />                      
                       <Typography variant="caption" className={classes.message_hidden}> Hidden </Typography>                       
                    </Grid>
                    <Grid item xs={11} className={classes.theirmessage_box} >                   
                            <div className={ matchXS ? `${classes.theirmessage_content_box} ${classes.xs}` : classes.theirmessage_content_box}>                         
                            <BeatLoader size={9} margin={4} color={"#b4b4b4"} className={classes.loader}/>                                
                            </div>                                             
                    </Grid>
                </Grid>
            </Box>
    )
};
export default TypingMessage;