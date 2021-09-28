import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import AllSchedules from "./allSchedules";
import AddSchedule from './addSchedule'
import SetArea from "./setArea";

const Schedules = () => {
    return (
        <>
            <Route path="/electricity/schedules" exact component={AllSchedules} />
            <Route path="/electricity/schedules/add" exact component={AddSchedule} />
            <Route path="/electricity/schedules/setArea/:id" exact component={SetArea} />
        </>
    );
}

export default Schedules;