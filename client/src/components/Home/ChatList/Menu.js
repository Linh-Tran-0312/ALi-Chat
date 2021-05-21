import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import DesktopIcon from '@material-ui/icons/DesktopAccessDisabled';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import MenuIcon from '@material-ui/icons/Menu';
import React from 'react';

const SimpleMenu = ({logout, selectProfile, hideYourScreen}) => {
    
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
      };
    const handleGetProfile = () => {
        const user = JSON.parse(localStorage.getItem('profile')).result;
        setAnchorEl(null);
        return selectProfile(user);
    }
    const handleLogout = () => {
        return logout()
    };
    const handleHideYourScreen = () => {
        setAnchorEl(null);
        return hideYourScreen()
    }

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
                <MenuItem onClick={handleHideYourScreen}>Hide screen &nbsp;<DesktopIcon /></MenuItem>
            </Menu>
        </div>
    );
};

export default SimpleMenu;
