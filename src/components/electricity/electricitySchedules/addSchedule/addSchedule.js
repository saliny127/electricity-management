import React, { useState, useEffect } from "react";
import { useHistory } from 'react-router-dom'
import { Form, Card } from "react-bootstrap"
import firebase, { e_schedules } from "../../../utils/firebase"
import Footer from "../../footer";
import Header from "../../header";

const AddSchedule = () => {

    const [values, setValues] = useState({ date: '', timeFrom: '', timeTo: '' })
    const [scheduleAreas, setScheduleAreas] = useState([])

    const history = useHistory()

    const handleValueChange = e => {
        e.persist();
        setValues(values => ({ ...values, [e.target.name]: e.target.value }))
    }

    const handleFormSubmit = (e) => {
        e.preventDefault();
        handleAdd().then(() => {
            history.push('/schedules')
        })
    }

    const handleAdd = () => {
        return e_schedules.doc().set(values).then(data => {
            console.log(data)
            return data
        }).catch(e => {
            console.log(e);
        })
    }

    return (
        <>
            <Header />
            <Card>
                <Card.Body>
                    <h2 className="text-center mb-4">Add powercut schedule</h2>
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
                        <button type="submit" className="btn btn-primary">
                            ADD
                        </button>
                    </Form>
                </Card.Body>
            </Card>

            <Footer />
        </>
    )
}

export default AddSchedule;