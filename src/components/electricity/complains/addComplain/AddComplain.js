import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import { useHistory } from 'react-router-dom'
import { Form, Card, Container, Button } from "react-bootstrap"
import firebase, { e_complains, e_users } from "src/utils/firebase"
import { useCollectionData } from "react-firebase-hooks/firestore";

const AddComplain = () => {
    const { id } = useParams()

    const userQuery = e_users.orderBy('createdAt')
    const [users, userLoading] = useCollectionData(userQuery, { idField: 'id' })

    const query = id && e_complains.where(firebase.firestore.FieldPath.documentId(), '==', id)
    const [complain, loading] = useCollectionData(query, { idField: 'id' })

    const [values, setValues] = useState({ reference: '', title: '', content: '', user: '' })
    const [submitting, setSubmitting] = useState(false)

    const history = useHistory()

    const handleValueChange = e => {
        e.persist();
        setValues(values => ({ ...values, [e.target.name]: e.target.value }))
    }

    const handleSelectChange = e => {
        setValues({ ...values, user: e.target.value })
    }

    const handleFormSubmit = (e) => {
        e.preventDefault();
        setSubmitting(true)
        if (id) {
            e_complains.doc(id).update({ ...values }).then(data => {
                history.push(`/electricity/complains`)
                setSubmitting(false)
            }).catch(e => {
                console.log(e);
            })
        } else {
            e_complains.add({ ...values, createdAt: firebase.firestore.FieldValue.serverTimestamp(), }).then(data => {
                history.push(`/electricity/complains`)
                setSubmitting(false)
            }).catch(e => {
                console.log(e);
            })
        }
    }

    useEffect(() => {
        if (!complain || !id) return
        setValues(complain[0])
    }, [complain])

    useEffect(() => {
        if (!users) return
        setValues({ ...values, user: users[0].id })
    }, [users])

    if (id && loading) return <h4>Please wait</h4>

    return (
        <Container>
            <Card>
                <Card.Body>
                    <h2 className="text-center mb-4">{id ? "Edit Complain" : "Add New Complain"}</h2>
                    <Form onSubmit={handleFormSubmit}>
                        <div className="form-group">
                            <label>Consumer</label>
                            {userLoading
                                ? <h5>Loading</h5>
                                :
                                <select className="form-control" onChange={handleSelectChange} value={values.user}>
                                    {
                                        users?.map((user, id) => (
                                            <option key={id} value={user.id} >{user.fullname}</option>
                                        ))
                                    }
                                </select>
                            }
                        </div>
                        <div className="form-group">
                            <label>Reference Number</label>
                            <input
                                value={values.reference}
                                type="text"
                                className="form-control"
                                name="reference"
                                onChange={handleValueChange}
                            >
                            </input>
                        </div>
                        <div className="form-group">
                            <label>Title</label>
                            <input
                                value={values.title}
                                type="text"
                                className="form-control"
                                name="title"
                                onChange={handleValueChange}
                            >
                            </input>
                        </div>
                        <div className="form-group">
                            <label>Content</label>
                            <textarea
                                value={values.content}
                                className="form-control"
                                name="content"
                                onChange={handleValueChange}
                            >
                            </textarea>
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

export default AddComplain;