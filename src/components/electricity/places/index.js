
import React from 'react';
import AllPlaces from './allPlaces'
import Provinces from './proviences'
import AreaOffices from './areaOffices';
import Areas from './areas';
import { Route } from "react-router-dom"

const Places = () => {
    return (
        <>
            <Route path="/electricity/places/all" component={AllPlaces} />
            <Route path="/electricity/places/provinces" component={Provinces} />
            <Route path="/electricity/places/areaOffices" component={AreaOffices} />
            <Route path="/electricity/places/areas" component={Areas} />
        </>
    );
}

export default Places;