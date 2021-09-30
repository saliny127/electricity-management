import React, { useState, useEffect } from 'react';
import { e_powercut } from "src/utils/firebase"
import { Link } from 'react-router-dom';
import { Container, Row, Col, Table, Button } from 'react-bootstrap'
import { useCollectionData } from 'react-firebase-hooks/firestore';
import TRow from './TRow'

const Allpowercuts = () => {
    const query = e_powercut.orderBy('createdAt')
    const [complains, loading] = useCollectionData(query, { idField: 'id' })

    if (loading) return <h4>Loading</h4>
    return (
        <>
            <Container>
                <Row>
                    <Col xs={12}>
                        <Link className="btn btn-primary my-2" to="/electricity/powercut/add">Add New Powercut</Link>
                        <Table striped bordered hover>
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Client</th>
                                    <th>Consumer</th>
                                    <th>date-time</th>
                                    <th>Status</th>
                                    <th>Description</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {complains.map((complain, id) => (
                                    <TRow data={complain} id={id} key={id} />
                                ))}
                            </tbody>
                        </Table>
                    </Col>
                </Row>
            </Container>
        </>
    );
}

export default Allpowercuts;