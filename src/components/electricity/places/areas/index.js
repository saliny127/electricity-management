
import React from "react";
import Areas from "./Areas";
import { Route } from "react-router-dom"

export default () => {
    return (
        <>
            <Route path="/electricity/places/areas" exact component={Areas} />
        </>
    );
}