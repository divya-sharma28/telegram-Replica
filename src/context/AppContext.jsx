import { useContext, createContext, useState, useEffect} from 'react'
const AppContext = createContext();
const AppProvider = ({children}) => {

    const [userChats, setUserChats] = useState([]);
    const [openDrawer, setOpenDrawer] = useState(false);
    const [isDarkMode, setIsDarkMode] = useState(false)

    const toggleDrawer = (newOpen) => () => {
      setOpenDrawer(newOpen);
    };

    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  
    useEffect(() => {
      const handleResize = () => setIsMobile(window.innerWidth <= 768);
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }, []);
  return (
    <AppContext.Provider
    value={{
        userChats,
        setUserChats,
        openDrawer,
        setOpenDrawer,
        isMobile,
        toggleDrawer,
        isDarkMode,
        setIsDarkMode
    }}
    >
         {children}
    </AppContext.Provider>
  )
}

export const useGlobalContext = () => {
    return useContext(AppContext);
  };
  export { AppContext, AppProvider };