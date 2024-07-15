import { useState, useEffect } from 'react';
import Sidebar from '../Components/Sidebar/Sidebar';
import NavMobile from '../Components/navMobile/NavMobile';
import Conversation from '../Components/Conversation/Conversation';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const Home = () => {
  const [userChats, setUserChats] = useState([]);
  const [openDrawer, setOpenDrawer] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <Container fluid>
      <Row>
        {isMobile && <NavMobile userChats={userChats} setUserChats={setUserChats} setOpenDrawer={setOpenDrawer} />}
        {(!isMobile || (isMobile && userChats.length === 0)) && (
          <Col lg="4" className='ps-0 pe-1'>
            <Sidebar setOpenDrawer={setOpenDrawer} openDrawer={openDrawer} isMobile={isMobile} setUserChats={setUserChats} />
          </Col>
        )}
        {(!isMobile || (isMobile && userChats.length > 0)) && (
          <Col lg="8" className='px-0'>
            <Conversation isMobile={isMobile} userChats={userChats} />
          </Col>
        )}
      </Row>
    </Container>
  );
};

export default Home;
