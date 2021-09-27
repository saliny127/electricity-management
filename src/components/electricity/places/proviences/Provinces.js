import React from "react";
import { Form, Card } from "react-bootstrap"
import AllProviences from "./allProviences";
import AddProvince from './addProvience'

const Provinces = () => {
    return (
        <>
            <Card>
                <Card.Body>
                    <AllProviences />
                    <AddProvince />
                </Card.Body>
            </Card>
        </>
    );
}

export default Provinces;