import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import AllUsers from "./allUsers";
import AddUser from './addUser'

const Users = () => {
    return (
        <>
            <Route path="/electricity/users" exact component={AllUsers} />
            <Route path="/electricity/users/add" exact component={AddUser} />
            <Route path="/electricity/users/edit/:id" exact component={AddUser} />
        </>
    );
}

export default Users;