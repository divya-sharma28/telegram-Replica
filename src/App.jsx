import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './Pages/Home';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/telegram-replica" element={<Home/>} /> 
      </Routes>
    </BrowserRouter>
  )
}

export default App
