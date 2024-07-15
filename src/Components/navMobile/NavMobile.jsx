import React from 'react'
import MenuIcon from '@mui/icons-material/Menu';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import ArrowBackOutlinedIcon from '@mui/icons-material/ArrowBackOutlined';
import PhoneOutlinedIcon from '@mui/icons-material/PhoneOutlined';
import MoreVertOutlinedIcon from '@mui/icons-material/MoreVertOutlined';
import Avatar from '@mui/material/Avatar';
import "./NavMobile.css"
const NavMobile = ({ userChats, setUserChats, setOpenDrawer}) => {

  const data = userChats.find((val) => val.sender.id !== 1)

  return (
    <div className='navMobile p-3'>

      {userChats.length > 0 ?
        <div className='d-flex align-items-center justify-content-between'>
          <div className='d-flex gap-2 align-items-center'>
            <ArrowBackOutlinedIcon onClick={() => setUserChats([])} />
            <Avatar
              alt={data.sender.name}
              src="/static/images/avatar/1.jpg"
              sx={{ width: 40, height: 40, backgroundColor: "orange" }}
            />


            {(data.sender.name ? data.sender.name : "Unknown")}

          </div>

          <div className='d-flex gap-2'>
            <PhoneOutlinedIcon />
            <MoreVertOutlinedIcon />
          </div>
        </div> :
        <div className='d-flex justify-content-between'>
          <div className='d-flex gap-3'>
            <MenuIcon onClick={() => setOpenDrawer(prev => !prev)} />
            Telegram
          </div>
          <SearchOutlinedIcon />
        </div>}
    </div>
  )
}

export default NavMobile;