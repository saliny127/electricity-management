import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import { useHistory } from 'react-router-dom'
import { Form, Card, Container, Button } from "react-bootstrap"
import firebase, { e_users, e_areas } from "src/utils/firebase"
import { useCollectionData } from "react-firebase-hooks/firestore";

const AddUser = () => {
    const { id } = useParams()

    const areaQuery = e_areas.orderBy('createdAt')
    const [areas, areaLoading] = useCollectionData(areaQuery, { idField: 'id' })

    const query = id && e_users.where(firebase.firestore.FieldPath.documentId(), '==', id)
    const [user, loading] = useCollectionData(query, { idField: 'id' })

    const [values, setValues] = useState({ registration: '', fullname: '', address: '', area: '' })
    const [submitting, setSubmitting] = useState(false)

    const history = useHistory()

    const handleValueChange = e => {
        e.persist();
        setValues(values => ({ ...values, [e.target.name]: e.target.value }))
    }

    const handleSelectChange = e => {
        setValues({ ...values, area: e.target.value })
    }

    const handleFormSubmit = (e) => {
        e.preventDefault();
        setSubmitting(true)
        if (id) {
            e_users.doc(id).update({ ...values }).then(data => {
                history.push(`/electricity/users`)
                setSubmitting(false)
            }).catch(e => {
                console.log(e);
            })
        } else {
            e_users.add({ ...values, createdAt: firebase.firestore.FieldValue.serverTimestamp(), }).then(data => {
                history.push(`/electricity/users`)
                setSubmitting(false)
            }).catch(e => {
                console.log(e);
            })
        }
    }

    useEffect(() => {
        if (!user || !id) return
        setValues(user[0])
    }, [user])

    if (id && loading) return <h4>Please wait</h4>

    return (
        <Container>
            <Card>
                <Card.Body>
                    <h2 className="text-center mb-4">{id ? "Edit Consumer" : "Add New Consumer"}</h2>
                    <Form onSubmit={handleFormSubmit}>
                        <div className="form-group">
                            <label>Registration Number</label>
                            <input
                                value={values.registration}
                                type="text"
                                className="form-control"
                                name="registration"
                                onChange={handleValueChange}
                            >
                            </input>
                        </div>
                        <div className="form-group">
                            <label>Consumer Full Name</label>
                            <input
                                value={values.fullname}
                                type="text"
                                className="form-control"
                                name="fullname"
                                onChange={handleValueChange}
                            >
                            </input>
                        </div>
                        <div className="form-group">
                            <label>Address</label>
                            <textarea
                                value={values.address}
                                className="form-control"
                                name="address"
                                onChange={handleValueChange}
                            >
                            </textarea>
                        </div>
                        <div className="form-group">
                            <label>Area</label>
                            {areaLoading
                                ? <h5>Loading</h5>
                                :
                                <select className="form-control" onChange={handleSelectChange} value={values.area}>
                                    {
                                        areas?.map((area, id) => (
                                            <option key={id} value={area.id} >{area.name}</option>
                                        ))}
                                </select>
                            }
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

export default AddUser;