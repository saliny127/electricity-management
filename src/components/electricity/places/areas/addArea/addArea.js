import React, { useState, useEffect } from "react";
import { Form, Card } from "react-bootstrap"
import { useCollectionData } from 'react-firebase-hooks/firestore';
import firebase, { e_areas, e_provinces } from "src/utils/firebase"

const AddArea = ({ areaOffices }) => {
    const [area, setArea] = useState('')
    const [areaOffice, setAreaOffce] = useState('')

    const changeHandler = e => {
        setArea(e.target.value)
    }

    const handleSelectChange = e => {
        setAreaOffce(e.target.value)
    }

    const handleSubmit = e => {
        e.preventDefault()
        e_areas.add({
            name: area,
            areaOffice,
            createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        }).then(() => {
            setArea('')
        }).catch(e => {
            console.log(e);
        })
    }

    useEffect(() => {
        if (areaOffices) setAreaOffce(areaOffices[0].id)
    }, [areaOffices])

    return (
        <>
            <Card>
                <Card.Body>
                    <h2 className="text-center mb-4">Add Area Office</h2>
                    <Form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label>Area office name</label>
                            <input
                                type="text"
                                className="form-control"
                                value={area}
                                onChange={changeHandler}
                            >
                            </input>
                            <label>Select province</label>
                            <select className="form-control" onChange={handleSelectChange} value={areaOffice}>
                                {areaOffices?.map((pro, id) => (
                                    <option key={id} value={pro.id} >{pro.name}</option>
                                ))}
                            </select>
                            <button type="submit" className="btn btn-primary form-control mt-2">
                                ADD
                            </button>
                        </div>
                    </Form>
                </Card.Body>
            </Card>
        </>
    )
}

export default AddArea;