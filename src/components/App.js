import React, {Component} from "react"
import SignUp from "./Signup"
import { Container } from "react-bootstrap"
import { AuthProvider } from "../contexts/AuthContext"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import Dashboard from "./Dashboard"
import LogIn from "./login/Login"
import PrivateRoute from "./PrivateRoute"
import ForgotPassword from "./login/ForgotPassword"
import UpdateProfile from "./UpdateProfile"
import Home from "./home/home"
import LostDetails from "./transportLost/lost"
import TransportComplaints from "./transportComplain/complains"
import Profile from "./profile/updateProfile"
import Moderators from "./moderator/viewModerators"
import AddModerator from "./moderator/addModerator"
import "./App.css";
import routes from "../routes"
import Footer from "./footer"


class App extends Component{
  render(){
    return ( 
      <div className="App">
        <Router>
          <AuthProvider>
            {routes}
          </AuthProvider>
          <Footer/>
        </Router>
        
      </div>
  );
  }
}

export default App;
