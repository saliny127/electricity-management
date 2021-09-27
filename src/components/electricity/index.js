
import React from 'react'
import { Route, Redirect, Switch } from "react-router-dom"
import Header from 'src/components/header';
import Footer from 'src/components/footer';

import CustomNavbar from './CustomNavbar'
import Places from './places'
import '../home/home.css'

const Electricity = () => {
    return (
        <>
            <Header />
            <CustomNavbar />
            <Switch>
                <Route path="/electricity/places" component={Places} />
                <Route path="/" render={() => <Redirect to="/electricity/places/provinces" />} />
            </Switch>
            <Footer />
        </>
    );
}

export default Electricity;