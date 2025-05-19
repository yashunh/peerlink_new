import './App.css'
import { BrowserRouter, Routes,Route } from "react-router-dom";
import Homepage from "./pages/Homepage";
import Signin from './pages/Signin';
import Signup from './pages/Signup';

function App() {
 
  return (
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Homepage/>} />
        <Route path="/home" element={<Homepage/>} />
        <Route path="/signin" element={<Signin/>} />
        <Route path="/signup" element={<Signup/>} />
      </Routes>
     </BrowserRouter>
  )
}

export default App
