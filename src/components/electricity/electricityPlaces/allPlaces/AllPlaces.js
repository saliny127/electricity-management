import React, { useState } from 'react';
// import { firebaseLooper } from '../../utils/tools';
// import { backOfficeCollection } from '../../utils/firebase';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Table } from 'react-bootstrap'
import Header from '../../header';
import Footer from '../../footer';
import '../../home/home.css'

const AllPlaces = () => {
    const [districts, setDistricts] = useState(['Ampara', 'Anuradhapura', 'Polonnaruwa', 'Matale', 'Kandy', 'Nuwara Eliya	'])
    return (
        <>
            <Header />
            <Container>
                <Row>
                    <Col xs={6}>
                        <Table striped bordered hover>
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>District</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {districts.map((district, id) => (
                                    <tr key={id}>
                                        <td>{id + 1}</td>
                                        <td>{district}</td>
                                        <td></td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </Col>
                </Row>
            </Container>
            <Footer />
        </>
    );
}

export default AllPlaces;