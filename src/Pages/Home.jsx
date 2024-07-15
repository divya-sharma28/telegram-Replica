import Sidebar from '../Components/Sidebar/Sidebar';
import NavMobile from '../Components/navMobile/NavMobile';
import Conversation from '../Components/Conversation/Conversation';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useGlobalContext } from '../context/AppContext';
const Home = () => {

  const {isMobile, userChats , isDarkMode} = useGlobalContext()
  return (
    <Container fluid className={isDarkMode ?"darkShade2":""}>
      <Row>
        {isMobile && <NavMobile />}
        {(!isMobile || (isMobile && userChats.length === 0)) && (
          <Col lg="4" className='ps-0 pe-1'>
            <Sidebar />
          </Col>
        )}
        {(!isMobile || (isMobile && userChats.length > 0)) && (
          <Col lg="8" className='px-0'>
            <Conversation />
          </Col>
        )}
      </Row>
    </Container>
  );
};

export default Home;
