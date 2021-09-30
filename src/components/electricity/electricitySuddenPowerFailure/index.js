import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import AllPowerfailureComplains from "./allPowerfailureComplains";
import AddPowerfailureComplain from './addPowerfailureComplain'
import ViewPowerfailureComplaint from './viewPowerfailureComplain'

const Users = () => {
    return (
        <>
            <Route path="/electricity/powercut" exact component={AllPowerfailureComplains} />
            <Route path="/electricity/powercut/add" exact component={AddPowerfailureComplain} />
            <Route path="/electricity/powercut/edit/:id" exact component={AddPowerfailureComplain} />
            <Route path="/electricity/powercut/view/:id" exact component={ViewPowerfailureComplaint} />
        </>
    );
}

export default Users;