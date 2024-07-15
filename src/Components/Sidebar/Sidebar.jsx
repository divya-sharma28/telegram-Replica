import { useState, useEffect } from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import SideDrawer from '../SideDrawer/SideDrawer';
import "./Sidebar.css";
import Avatar from '@mui/material/Avatar';
import axios from 'axios';
import InfiniteScroll from 'react-infinite-scroller';
import moment from 'moment/moment';
import DoneAllOutlinedIcon from '@mui/icons-material/DoneAllOutlined';


const Sidebar = ({setUserChats, isMobile,setOpenDrawer, openDrawer}) => {
  const [allChats, setAllChats] = useState([]);
  const [lastMessages, setLastMessages] = useState({});
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [avatarColor, setAvatarColor] = useState("orange");
  const [lastSenderId, setLastSenderId] = useState({});
  
  const toggleDrawer = (newOpen) => () => {
    setOpenDrawer(newOpen);
  };

  const getAllChats = async (pageNumber) => {
    try {
      const response = await axios.get(`https://devapi.beyondchats.com/api/get_all_chats?page=${pageNumber}`);
      const newChats = response.data.data.data;
      setAllChats((prevChats) => [...prevChats, ...newChats]);
      setPage(response.data.data.current_page);
      setTotalPages(response.data.data.last_page);
      
      newChats.forEach(chat => fetchFirstMessage(chat.id));
    } catch (error) {
      console.error('Error fetching all chats:', error);
    }
  };

  const fetchFirstMessage = async (id) => {
    try {
      const response = await axios.get(`https://devapi.beyondchats.com/api/get_chat_messages?chat_id=${id}`);
      if (response.data.data.length > 0) {
        setLastMessages((prevLastMessages) => ({
          ...prevLastMessages,
          [id]: response.data.data[response.data.data.length-1].message,
        }));

        setLastSenderId((prevIds) => ({
          ...prevIds,
          [id]: response.data.data[response.data.data.length-1].sender_id,
        }));
      }
    } catch (error) {
      console.error('Error fetching first message:', error);
    }
  };

  const chatIdFunc = (id) => {
    getUserChats(id);
  };

  const getUserChats = async (id) => {
    try {
      const response = await axios.get(`https://devapi.beyondchats.com/api/get_chat_messages?chat_id=${id}`);
      setUserChats(response.data.data);
    } catch (error) {
      console.error('Error fetching user chats:', error);
    }
  };

  useEffect(() => {
    getAllChats(page);
  }, []);

  const formatDate = (date) => {
    return moment(date).isSame(moment(), 'day')
      ? moment(date).format("hh:mm A")
      : moment(date).format("DD-MM-YYYY");
  };

  const loadFunc = () => {
    if (page < totalPages) {
      const nextPage = page + 1;
      setPage(nextPage);
      getAllChats(nextPage);
    }
  };

  return (
    <div className='ps-1 py-1 sidebar'>
     {!isMobile && <div className='d-flex align-items-center gap-3 px-2'>
        <MenuIcon onClick={toggleDrawer(true)} className='menubar' />
        <input type="text" placeholder='Search' className='searchInput font-13' />
      </div>}

      <div className={`sideChats ${isMobile ? "mt-1": ""}`}>
        <InfiniteScroll
          pageStart={0}
          loadMore={loadFunc}
          hasMore={page < totalPages}
          loader={<div className="loader" key={0}></div>}
        >
          {allChats && allChats.map((data, index) => (
            <div className={`d-flex gap-3 px-2 chats  ${isMobile ? "pt-3" : "py-3"}`} key={index} onClick={() => chatIdFunc(data.id)}>
              <div>
                <Avatar
                  alt={data.creator.name}
                  src="/static/images/avatar/1.jpg"
                  sx={{ width: 40, height: 40, backgroundColor: avatarColor }}
                />
              </div>
              <div className={`w-100`}>
                <div className='d-flex justify-content-between'>
                  <h6 className='mb-0 font-15'>{data.creator.name ? data.creator.name : "Unknown"}</h6>
                  <span className='font-12 text-secondary'>
                    {lastSenderId[data.id] === 1 && <DoneAllOutlinedIcon className='text-success font-15 mx-1'/>}
                    {formatDate(data.updated_at)}
                    </span>
                </div>
                <p className='mb-0 font-12 mt-1 text-secondary'>{lastMessages && lastMessages[data.id] ? lastMessages[data.id].slice(0,isMobile?45:55) : 'Loading'}...</p> 
               {isMobile && <hr className='mb-0 pb-0' />}
              </div>
            </div>
          ))}
        </InfiniteScroll>
      </div>

      <SideDrawer toggleDrawer={toggleDrawer} openDrawer={openDrawer} />
    </div>
  );
};

export default Sidebar;
