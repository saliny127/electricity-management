import React, { useState, useEffect } from 'react';
import { e_users } from "src/utils/firebase"
import { Link } from 'react-router-dom';
import { Container, Row, Col, Table, Button } from 'react-bootstrap'
import { useCollectionData } from 'react-firebase-hooks/firestore';
import TRow from './TRow'

const AllUsers = () => {
    const query = e_users.orderBy('createdAt')
    const [users, loading] = useCollectionData(query, { idField: 'id' })



    if (loading) return <h4>Loading</h4>
    return (
        <>
            <Container>
                <Row>
                    <Col xs={12}>
                        <Link className="btn btn-primary my-2" to="/electricity/users/add">Add New Consumer</Link>
                        <Table striped bordered hover>
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Registation Num</th>
                                    <th>Full Name</th>
                                    <th>Address</th>
                                    <th>Area</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.map((user, id) => (
                                    <TRow data={user} id={id} />
                                ))}
                            </tbody>
                        </Table>
                    </Col>
                </Row>
            </Container>
        </>
    );
}

export default AllUsers;