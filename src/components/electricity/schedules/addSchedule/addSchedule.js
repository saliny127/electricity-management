import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import { useHistory } from 'react-router-dom'
import { Form, Card, Container, Button } from "react-bootstrap"
import firebase, { e_schedules } from "src/utils/firebase"
import { useCollectionData } from "react-firebase-hooks/firestore";

const AddSchedule = () => {
    const { id } = useParams()

    const query = id && e_schedules.where(firebase.firestore.FieldPath.documentId(), '==', id)
    const [schedule, loading] = useCollectionData(query, { idField: 'id' })

    const [values, setValues] = useState({ date: '', timeFrom: '', timeTo: '', areas: [] })
    const [submitting, setSubmitting] = useState(false)

    const history = useHistory()

    const handleValueChange = e => {
        e.persist();
        setValues(values => ({ ...values, [e.target.name]: e.target.value }))
    }

    const handleFormSubmit = (e) => {
        e.preventDefault();
        setSubmitting(true)
        if (id) {
            e_schedules.doc(id).update({ ...values }).then(data => {
                history.push(`/electricity/schedules/setArea/${id}`)
                setSubmitting(false)
            }).catch(e => {
                console.log(e);
            })
        } else {
            e_schedules.add({ ...values, createdAt: firebase.firestore.FieldValue.serverTimestamp(), }).then(data => {
                history.push(`/electricity/schedules/setArea/${data.id}`)
                setSubmitting(false)
            }).catch(e => {
                console.log(e);
            })
        }
    }

    useEffect(() => {
        if (!schedule || !id) return
        setValues(schedule[0])
    }, [schedule])

    if (id && loading) return <h4>Please wait</h4>

    return (
        <Container>
            <Card>
                <Card.Body>
                    <h2 className="text-center mb-4">{id ? "Edit Schedule" : "Add New Schedule"}</h2>
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
                        <Button type="submit" variant="primary" block disabled={submitting}>
                            Next
                        </Button>
                    </Form>
                </Card.Body>
            </Card>
        </Container>
    )
}

export default AddSchedule;