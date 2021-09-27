import React from "react";
import AllSchedules from "./allSchedules";
import AddSchedule from './addSchedule'
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import Header from '../header';
import Footer from '../footer.js';

const Schedules = () => {
    return (
        <>
            <Route path="/schedules" exact component={AllSchedules} />
            <Route path="/schedules/add" exact component={AddSchedule} />

        </>
    );
}

export default Schedules;

export { AllSchedules, AddSchedule }