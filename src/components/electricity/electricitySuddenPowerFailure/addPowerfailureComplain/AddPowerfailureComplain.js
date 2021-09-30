import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import { useHistory } from 'react-router-dom'
import { Form, Card, Container, Button } from "react-bootstrap"
import firebase, { e_powercut, clients, e_users } from "src/utils/firebase"
import { useCollectionData } from "react-firebase-hooks/firestore";

const AddPowercut = () => {


    const [e_user, loading] = useCollectionData(e_users, { idField: 'id' })
    const [client, clientloading] = useCollectionData(clients, { idField: 'id' })


    const [values, setValues] = useState({ account_number: '', date_time: '', user: '' })
    const [submitting, setSubmitting] = useState(false)

    const history = useHistory()
 
    const handleValueChange = e => {
        e.persist();
        setValues(values => ({ ...values, [e.target.name]: e.target.value }))
 
    }

    const handleSelectUserChange = e => {
        setValues({ ...values, user: e.target.value })
    }

    const handleSelectRegisChange = e => {
        setValues({ ...values, account_number: e.target.value })
    }

    const handleFormSubmit = (e) => {
        var timestampDate = new Date();     // this will return current date-time
        let dateString = values.date_time;
        if(dateString != ''){
            // this will return timestamp according to provided date-time
            dateString = dateString.replace(' ', 'T');
            timestampDate = new Date(dateString);
        } 
        timestampDate = firebase.firestore.Timestamp.fromDate(timestampDate);

        e.preventDefault();
        setSubmitting(true)

        e_powercut.add({
            
            account_number: values.account_number, 
            user:values.user,
            date_time: timestampDate,
            status: 'pending',
            description: 'reported by customers',
            createdAt: firebase.firestore.FieldValue.serverTimestamp(), 
        }).then(data => {
            history.push(`/electricity/powercut`)
            setSubmitting(false)
        }).catch(e => {
            console.log(e);
        })
        
    }
    

    return (
        <Container>
            <Card>
                <Card.Body>
                    <h2 className="text-center mb-4">{"Add New Power-cut"}</h2>
                    <Form onSubmit={handleFormSubmit}>
                        <div className="form-group">
                            <label>Account number</label>
                            {clientloading
                                ? <h5>Loading</h5>
                                :
                                <select className="form-control" onChange={handleSelectRegisChange} value={values.account_number}>
                                    {
                                        e_user?.map((e_user, id) => (
                                            <option key={id} value={e_user.registration} >{e_user.registration}</option>
                                        ))
                                    }
                                </select>
                            }
                        </div>
                        <div className="form-group">
                            <label>Client</label>
                            {clientloading
                                ? <h5>Loading</h5>
                                :
                                <select className="form-control" onChange={handleSelectUserChange} value={values.user}>
                                    {
                                        client?.map((client, id) => (
                                            <option key={id} value={client.id} >{client.email}</option>
                                        ))
                                    }
                                </select>
                            }
                        </div>
                        <div className="form-group">
                            <label>Date-time</label>
                            <input
                                value={values.date_time}
                                type="text"
                                className="form-control"
                                name="date_time"
                                onChange={handleValueChange}
                            >
                            </input>
                        </div>
                        <Button type="submit" variant="primary" block disabled={submitting}>
                            Save
                        </Button>
                    </Form>
                </Card.Body>
            </Card>
        </Container>
    )
}

export default AddPowercut;