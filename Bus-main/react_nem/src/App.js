import "./App.css";
import { BrowserRouter,Routes,Route } from "react-router-dom";
import Registration from "./pages/Registration";
import Login from "./pages/Login";
import Home from "./pages/Home";
import UserDetails from "./pages/UserDetails";
import SeatPicker from "./pages/SeatPicker";
import Add from "./pages/Add";
import Update from './pages/Update'
import MyBooking from "./pages/MyBooking";



function App() {
  const isLoggedIn = window.localStorage.getItem("loggedIn");
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
     
          <Route path="/" element={<Home/>}/>
          <Route path="/signup" element={<Registration/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/userDetails" element={<UserDetails/>}/>
          <Route path="/seat" element={<SeatPicker/>}/>
          <Route path="/add" element={<Add/>}/>
          <Route path="/update" element={<Update/>}/>
          <Route path="/mybook" element={<MyBooking/>}/>
         
    
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
