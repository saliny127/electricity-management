import React from "react";
import { Switch, Route } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import Home from "./components/home/home";
import ForgotPassword from "./components/login/ForgotPassword";
import LogIn from "./components/login/Login";
import AddModerator from "./components/moderator/addModerator";
import Moderators from "./components/moderator/viewModerators";
import Profile from "./components/profile/updateProfile";
import SignUp from "./components/Signup";
import TransportComplaints from "./components/transportComplain/complains";
import ViewComplaint from "./components/transportComplain/viewComplaint";
import LostDetails from "./components/transportLost/lost";
import ViewLost from "./components/transportLost/viewLost";
import UpdateProfile from "./components/UpdateProfile";
// import ElectricityAddPlaces from "./components/electricityPlaces/addPlace";
// import ElectricityAllPlaces from "./components/electricityPlaces/allPlaces";
// import ElectricityAddSchedules from "./components/electricitySchedules/addSchedule/addSchedule";
// import ElectricityAllSchedules from "./components/electricitySchedules/allSchedules/AllSchedules.js";

import Electricity from 'src/components/electricity'


export default (
    <Switch>
        <Route exact path="/" component={Dashboard} />
        <Route path="/update-profile" component={UpdateProfile} />
        <Route path="/home" component={Home} />
        <Route path="/signup" component={SignUp} />
        <Route path="/login" component={LogIn} />
        <Route path="/forgot-password" component={ForgotPassword} />
        <Route path="/profile" component={Profile} />
        <Route path="/moderator_details" component={Moderators} />
        <Route path="/add_moderator" component={AddModerator} />
        <Route path="/transport_lost_details" component={LostDetails} />
        <Route path="/transport_complaints" component={TransportComplaints} />
        <Route path="/transport-complaint-view/:id" component={ViewComplaint} />
        <Route path="/transport-lostdetails-view/:id" component={ViewLost} />
        <Route path="/electricity" component={Electricity} />
        {/* <Route path="/electricity_places/allPlaces" component={ElectricityAllPlaces} />
              <Route path="/electricity_places/addPlaces" component={ElectricityAddPlaces} />
              <Route path="/electricity_schedules/allSchedule" component={ElectricityAllSchedules} />
              <Route path="/electricity_schedules/addSchedule" component={ElectricityAddSchedules} /> */}

    </Switch>
);