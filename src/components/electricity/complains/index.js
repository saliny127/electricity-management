import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import AllComplains from "./allComplains";
import AddComplain from './addComplain'
import ViewComplaint from './viewComplain'

const Users = () => {
    return (
        <>
            <Route path="/electricity/complains" exact component={AllComplains} />
            <Route path="/electricity/complains/add" exact component={AddComplain} />
            <Route path="/electricity/complains/edit/:id" exact component={AddComplain} />
            <Route path="/electricity/complains/view/:id" exact component={ViewComplaint} />
        </>
    );
}

export default Users;