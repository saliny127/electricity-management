
import React from "react";
import Provinces from "./Provinces";
import { Route } from "react-router-dom"

const ProvincesCom = () => {
    return (
        <>
            <Route path="/electricity/places/provinces" exact component={Provinces} />
        </>
    );
}

export default ProvincesCom;