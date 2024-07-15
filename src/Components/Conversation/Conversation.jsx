import React from 'react'
import "./Conversation.css"
import AttachFileOutlinedIcon from '@mui/icons-material/AttachFileOutlined';
import SentimentSatisfiedOutlinedIcon from '@mui/icons-material/SentimentSatisfiedOutlined';
import KeyboardVoiceOutlinedIcon from '@mui/icons-material/KeyboardVoiceOutlined';
import DoneAllOutlinedIcon from '@mui/icons-material/DoneAllOutlined';
import PhoneOutlinedIcon from '@mui/icons-material/PhoneOutlined';
import MoreVertOutlinedIcon from '@mui/icons-material/MoreVertOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import moment from 'moment';

const Conversation = ({ userChats, isMobile }) => {
  
  const data = userChats.find((val) => val.sender.id !== 1)

  const renderChatDay = (chat, index, chats) => {
    const currentDay = moment(chat.created_at).format('MMMM D, YYYY');
    const previousChat = chats[index - 1];
    const previousDay = previousChat ? moment(previousChat.created_at).format('MMMM D, YYYY') : null;
    if (currentDay !== previousDay) {
      return <p className='chat-day text-center font-13 fw-semibold my-3' key={`day-${index}`}>{currentDay}</p>;
    }
    return null;
  };

  return (
    <div className={`conversation ${!isMobile && "vh-100"} position-relative`}>

      {!isMobile && userChats && userChats.length > 0 && <div className='bg-white p-3 convoDesktopHeader'>
      <div className='d-flex align-items-center justify-content-between'>
          <div className='d-flex gap-2 align-items-center font-14 fw-semibold'>
            

            {(data && data.sender.name ? data.sender.name : "Unknown")}

          </div>

          <div className='d-flex gap-3 text-secondary font-15'>
            <SearchOutlinedIcon/>
            <PhoneOutlinedIcon />
            <MoreVertOutlinedIcon />
          </div>
        </div> 
      </div>}
      {userChats && userChats.length > 0 ? (
        <>
          <div className={`convo-box w-100 d-flex flex-column p-2 ${isMobile? "mobileHeight" :"desktopHeight"}`}>
            {userChats.map((chat, index) => (
              <React.Fragment key={index}>
                {renderChatDay(chat, index, userChats)}
                <div className={`bubble flex-column pb-1 mb-1 ${chat.sender.id === 1 ? "right align-self-end" : "left align-self-start"} font-14`}>
                  <p className='mb-0'>{chat.message}</p>
                  <p className='text-end mb-0 font-12 text-secondary align-self-end ps-3 mt-2'>
                    {moment(chat.created_at).format('hh:mm')}
                  {chat.sender.id === 1 ?  <DoneAllOutlinedIcon fontSize='20' className='ms-2 text-success'/>: ""}
                  </p>
                  
                </div>
              </React.Fragment>
            ))}
          </div>

          <div className='bg-white d-flex px-3 py-2 gap-3 border-secondary border border-0 border-start'>
            <AttachFileOutlinedIcon className='text-secondary cursor-pointer' />
            <input type="text" placeholder='Write a message...' className='messageInput font-14' />
            <SentimentSatisfiedOutlinedIcon className='text-secondary cursor-pointer' />
            <KeyboardVoiceOutlinedIcon className='text-secondary cursor-pointer' />
          </div>
        </>
      ) : (
        <div className='d-flex flex-column align-items-center justify-content-center h-100'>
          <div className='select-chat-msg font-13 px-2 py-1 rounded-pill text-white fw-semibold'>
            Select a chat to start messaging
          </div>
        </div>
      )}
    </div>
  );
};

export default Conversation;
