
import React from 'react';
import Provinces from './proviences'
import { Route } from "react-router-dom"

const Places = () => {
    return (
        <>
            <Route path="/electricity/places/provinces" component={Provinces} />
        </>
    );
}

export default Places;