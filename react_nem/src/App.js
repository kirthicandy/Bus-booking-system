import "./App.css";
import { BrowserRouter,Routes,Route } from "react-router-dom";
import Registration from "./pages/Registration";
import Login from "./pages/Login";
import Home from "./pages/Home";
import UserDetails from "./pages/UserDetails";

import Add from "./pages/Add";

import MyBooking from "./pages/MyBooking";
import Chooseseat from "./pages/Chooseseat";
import RouteDetails from "./pages/RouteDetails";
import UpdateBusInfo from "./pages/UpdateBusInfo";
import UpdateRouteInfo from "./pages/UpdateRouteInfo";
import AddRoute from "./pages/AddRoute";

import BookingDetails from "./pages/BookingDetails";



function App() {
 
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
     
          <Route path="/" element={<Home/>}/>
          <Route path="/signup" element={<Registration/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/userDetails" element={<UserDetails/>}/>
          
          <Route path="/bookinginfo/:id" element={<BookingDetails/>}/>
          <Route path="/add" element={<Add/>}/>
        
          <Route path="/mybook" element={<MyBooking/>}/>
          <Route path="/choose" element={<Chooseseat/>}/>
          <Route path="/route/:id" element={<RouteDetails/>}/>
          <Route path="/addroute/:id" element={<AddRoute/>}/>
          <Route path="/updatebusinfo/:id" element={<UpdateBusInfo/>}/>
          <Route path="/updaterouteinfo/:id" element={<UpdateRouteInfo/>}/>
          <Route path="/updaterouteinfo/:id" element={<UpdateRouteInfo/>}/>
         
    
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
