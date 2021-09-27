import React, { useState } from "react";
import { Form, Card } from "react-bootstrap"
import firebase, { e_provinces } from "src/utils/firebase"

const AddPlace = () => {
    const [province, setProvince] = useState('')

    const changeHandler = e => {
        setProvince(e.target.value)
    }

    const handleSubmit = e => {
        e.preventDefault()
        e_provinces.add({
            name: province,
            createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        }).then(() => {
            setProvince('')
        }).catch(e => {
            console.log(e);
        })
    }

    return (
        <>
            <Card>
                <Card.Body>
                    <h2 className="text-center mb-4">Add province</h2>
                    <Form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label>Province name</label>
                            <input
                                type="text"
                                className="form-control"
                                value={province}
                                onChange={changeHandler}
                            >
                            </input>
                            <button type="submit" className="btn btn-primary form-control">
                                ADD
                            </button>
                        </div>
                    </Form>
                </Card.Body>
            </Card>
        </>
    )
}

export default AddPlace;