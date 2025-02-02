import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import { useHistory } from 'react-router-dom'
import { Form, Card, Container, Button } from "react-bootstrap"
import firebase, { e_complains, clients, e_users } from "src/utils/firebase"
import { useCollectionData } from "react-firebase-hooks/firestore";
import AddComplain from ".";

const AddComplaint = () => {


    const [e_user, loading] = useCollectionData(e_users, { idField: 'id' })
    const [client, clientloading] = useCollectionData(clients, { idField: 'id' })


    const [values, setValues] = useState({ account_number: '', user: '', complain_type: '', complaint: '' })
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

    const handleSelectTypeChange = e => {
        setValues({ ...values, complain_type: e.target.value })
    }

    const handleFormSubmit = (e) => {
        e.preventDefault();
        setSubmitting(true)
       
        e_complains.add({           
            account_number: values.account_number, 
            user:values.user,
            complain_type:values.complain_type,
            complaint:values.complaint,
            status: 'pending',
            description: 'Complaint is received',
            createdAt: firebase.firestore.FieldValue.serverTimestamp(), 
        }).then(data => {
            history.push(`/electricity/complains`)
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
                                <select className="form-control" onChange={handleSelectRegisChange} name={values.account_number}>
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
                            <label>Complaint type</label>
                                <select className="form-control" onChange={handleSelectTypeChange} value={values.complain_type}>
                                    <option value={'Breakdown'} >{'Break-down'}</option>
                                    <option  value={'Service Request'} >{'Service-request'}</option>
                                </select>
                        </div>
                        <div className="form-group">
                            <label>Complaint</label>
                            <input
                                value={values.complaint}
                                type="text"
                                className="form-control"
                                name="complaint"
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

export default AddComplaint;