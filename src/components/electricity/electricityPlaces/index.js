import React from "react";
import AllPlaces from "./allPlaces";
import AddPlace from './addPlace'
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import Header from '../../header';
import Footer from '../../footer';
import '../home/home.css'

const Places = () => {
    return (
        <>

            <Route path="/places" exact component={AllPlaces} />
            <Route path="/places/add" exact component={AddPlace} />

        </>
    );
}

export default Places;

export { AllPlaces, AddPlace }