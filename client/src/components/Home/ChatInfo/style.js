import { makeStyles, withStyles } from '@material-ui/core/styles';
import AvatarGroup from '@material-ui/lab/AvatarGroup';
import Accordion from '@material-ui/core/Accordion';
import { makeStyles, withStyles } from '@material-ui/core/styles';
export const useStyle = makeStyles((theme) => ({
    title: {
        width: '100%',
        height: '30%',
        backgroundColor: '#f2f2f2',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',

    },
    details: {
        width: '100%',
        height: '70%',
        backgroundColor: 'white'
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        fontWeight: theme.typography.fontWeightRegular,
    },
    memberlist: {
        width: '100%',
        overflow: 'auto',
        maxHeight: 200,
    },
    thumbnail: {
        objectFit: 'cover',
        /* width: 30vw; */
    
         height: 100,
        width: 100,
    },
    chatinfo: {
        height: '100vh',
        width: '25%',
        overflow: 'scroll',
        backgroundColor: '#f2f2f2'
    },

}))

export const StyledAvaGroup = withStyles(() => ({
    root: {
        '& .MuiAvatarGroup-avatar': {
            width: 60,
            height: 60
        }

    }
}))(AvatarGroup);

export const StyledAccordion = withStyles(() => ({
    root: {
        "&$expanded": {
            margin: "auto"
        }
    },
    expanded: {}
}))(Accordion)