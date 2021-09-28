import React, { useState, useEffect } from 'react';
import { firebaseLooper } from "src/utils/tools";
import { e_schedules } from "src/utils/firebase"
import { Link } from 'react-router-dom';
import { Container, Row, Col, Table, Button } from 'react-bootstrap'
import { useCollectionData } from 'react-firebase-hooks/firestore';

const AllSchedules = () => {
    const query = e_schedules.orderBy('createdAt')
    const [schedules, loading] = useCollectionData(query, { idField: 'id' })

    const handleDelte = id => {
        e_schedules.doc(id).delete()
    }

    if (loading) return <h4>Loading</h4>
    return (
        <>
            <Container>
                <Row>
                    <Col xs={12}>
                        <Link className="btn btn-primary my-2" to="/electricity/schedules/add">Add new scheduled power cut</Link>
                        <Table striped bordered hover>
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Date</th>
                                    <th>Time From</th>
                                    <th>Time To</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {schedules.map((schedule, id) => (
                                    <tr key={id}>
                                        <td>{id + 1}</td>
                                        <td>{schedule.date}</td>
                                        <td>{schedule.timeFrom}</td>
                                        <td>{schedule.timeTo}</td>
                                        <td className="p-0">
                                            <Link className="btn btn-primary" to={`/electricity/schedules/edit/${schedule.id}`}>Edit</Link>
                                            <Link className="btn btn-warning ml-1" to={`/electricity/schedules/setArea/${schedule.id}`}>Set Areas</Link>
                                            <Button variant="danger" className="ml-1" onClick={() => handleDelte(schedule.id)}>Delete</Button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </Col>
                </Row>
            </Container>
        </>
    );
}

export default AllSchedules;