import React, { useState, useEffect } from 'react';
import { firebaseLooper } from "src/utils/tools";
import { e_schedules } from "src/utils/firebase"
import { Link } from 'react-router-dom';
import { Container, Row, Col, Table } from 'react-bootstrap'

const AllSchedules = () => {
    const [sechedules, setSchedules] = useState([])

    useEffect(() => {
        e_schedules.get().then(snapshot => {
            setSchedules(firebaseLooper(snapshot));
        })
    }, [])

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
                                {sechedules.map((sechedule, id) => (
                                    <tr key={id}>
                                        <td>{id + 1}</td>
                                        <td>{sechedule.date}</td>
                                        <td>{sechedule.timeFrom}</td>
                                        <td>{sechedule.timeTo}</td>
                                        <td></td>
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