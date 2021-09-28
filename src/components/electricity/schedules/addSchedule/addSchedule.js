import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import { useHistory } from 'react-router-dom'
import { Form, Card, Container } from "react-bootstrap"
import firebase, { e_schedules } from "src/utils/firebase"

const AddSchedule = () => {
    const { id } = useParams()
    const [values, setValues] = useState({ date: '', timeFrom: '', timeTo: '' })
    const [submitting, setSubmitting] = useState(false)
    const [scheduleAreas, setScheduleAreas] = useState([])

    const history = useHistory()

    const handleValueChange = e => {
        e.persist();
        setValues(values => ({ ...values, [e.target.name]: e.target.value }))
    }

    const handleFormSubmit = (e) => {
        e.preventDefault();
        setSubmitting(true)
        e_schedules.add({ ...values, areas: [] }).then(data => {
            history.push(`/electricity/schedules/setArea/${data.id}`)
            setSubmitting(false)
        }).catch(e => {
            console.log(e);
        })
    }

    return (
        <Container>
            <Card>
                <Card.Body>
                    <h2 className="text-center mb-4">Add Areas</h2>
                    <Form onSubmit={handleFormSubmit}>
                        <div className="form-group">
                            <label>Date</label>
                            <input
                                value={values.date}
                                type="date"
                                className="form-control"
                                name="date"
                                onChange={handleValueChange}
                            >
                            </input>
                        </div>
                        <div className="form-group">
                            <label>Time From</label>
                            <input
                                value={values.timeFrom}
                                type="time"
                                className="form-control"
                                name="timeFrom"
                                onChange={handleValueChange}
                            >
                            </input>
                        </div>
                        <div className="form-group">
                            <label>Time To</label>
                            <input
                                value={values.timeTo}
                                type="time"
                                className="form-control"
                                name="timeTo"
                                onChange={handleValueChange}
                            >
                            </input>
                        </div>
                        <button type="submit" className="btn btn-primary" disabled={submitting}>
                            Next
                        </button>
                    </Form>
                </Card.Body>
            </Card>
        </Container>
    )
}

export default AddSchedule;