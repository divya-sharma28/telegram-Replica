import { useState } from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';
import CampaignOutlinedIcon from '@mui/icons-material/CampaignOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import CallOutlinedIcon from '@mui/icons-material/CallOutlined';
import BookmarkBorderOutlinedIcon from '@mui/icons-material/BookmarkBorderOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import BedtimeOutlinedIcon from '@mui/icons-material/BedtimeOutlined';
import Avatar from '@mui/material/Avatar';
import { useGlobalContext } from '../../context/AppContext';

export default function SideDrawer() {
   
  const { toggleDrawer, openDrawer, isMobile, isDarkMode, setIsDarkMode} = useGlobalContext()
  const drawerItems = [
    {
      name: "New Group",
      icon: <PeopleAltOutlinedIcon />,
      event: ""
    },
    {
      name: "New Channel",
      icon: <CampaignOutlinedIcon />,
      event: ""
    },
    {
      name: "Contacts",
      icon: <AccountCircleOutlinedIcon />,
      event: ""
    },
    {
      name: "Calls",
      icon: <CallOutlinedIcon />,
      event: ""
    },
    {
      name: "Saved Messages",
      icon: <BookmarkBorderOutlinedIcon />,
      event: ""
    },
    {
      name: "Settings",
      icon: <SettingsOutlinedIcon />,
      event: ""
    },
    {
      name: "Night Mode",
      icon: <BedtimeOutlinedIcon />,
      event: () =>{
        setIsDarkMode(prev => !prev)
      }
    },
    
  ]

  const DrawerList = (
    <Box sx={{ width: 250}} role="presentation" className={`vh-100 ${isDarkMode?"darkShade2 text-white" :""}`} onClick={toggleDrawer(false)}>
       <List className={isMobile?`tele-color text-white`:""}>
        
          <div className='px-4 py-2'>
            <Button>
              <div>
              <Avatar style={{backgroundColor: "#FFD35A"}}
               sx={{ width: 50, height: 50 }}
              >D</Avatar>
              </div>
            </Button>
            <p className='ms-3 my-1 m-0 font-13 fw-semibold'>Divya</p>
          </div>
        
      </List>
      {!isMobile && <hr className='mb-0' />}
      <List>
        {drawerItems.map(({name, icon,event}, index) => (
          <ListItem key={index} disablePadding>
            <ListItemButton onClick={event}>
              <ListItemIcon className={isDarkMode?'text-white':'text-secondary'}>
                {icon}
              </ListItemIcon>
              <p className='font-13 fw-semibold m-0'>{name}</p>
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
     
    </Box>
  );

  return (
    <div >

      <Drawer open={openDrawer} onClose={toggleDrawer(false)}>
        {DrawerList}
      </Drawer>
    </div>
  );
}
