import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import MenuIcon from '@material-ui/icons/Menu';
import React from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { logout } from '../../../actions/auth';
import { selectProfile } from '../../../actions/user';

const SimpleMenu = () => {
    
    const [anchorEl, setAnchorEl] = React.useState(null);

    const dispatch = useDispatch();
    const history = useHistory();

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
      };

    const handleGetProfile = () => {
        const user = JSON.parse(localStorage.getItem('profile')).result;
        setAnchorEl(null);
        dispatch(selectProfile(user));
    }
    
    const handleLogout = () => {
        dispatch(logout(history))
    };

    return (
        <div>
            <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
                <MenuIcon />
            </Button>
            <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                <MenuItem onClick={handleGetProfile}>Profile &nbsp; <InfoOutlinedIcon /></MenuItem>
                <MenuItem onClick={handleLogout}>Logout &nbsp;<ExitToAppIcon /></MenuItem>
            </Menu>
        </div>
    );
};

export default SimpleMenu;
