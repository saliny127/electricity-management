
import React from "react";
import AreaOffices from "./AreaOffices";
import { Route } from "react-router-dom"

export default () => {
    return (
        <>
            <Route path="/electricity/places/areaOffices" exact component={AreaOffices} />
        </>
    );
}