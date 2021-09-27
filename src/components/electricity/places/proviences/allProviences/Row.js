import React, { useState, useEffect } from "react";
import firebase, { e_provinces } from "src/utils/firebase";
import { Button } from "react-bootstrap"

const Row = ({ data, id }) => {
    const [edit, setEdit] = useState(false)
    const [value, setValue] = useState(data.name)

    const handleEditClick = () => {
        setEdit(!edit)
    }

    const changeHandler = e => {
        setValue(e.target.value)
    }

    const handleSave = () => {
        e_provinces.doc(data.id).update({ name: value }).then(() => {
            setEdit(false)
        })
    }

    const handleDeleteClick = () => {
        e_provinces.doc(data.id).delete()
    }

    const handleCancel = () => {
        setEdit(false)
    }

    return (
        <tr>
            <td>{id + 1}</td>
            <td>
                {edit
                    ? <input
                        type="text"
                        className="form-control"
                        value={value}
                        onChange={changeHandler}
                    />
                    :
                    data.name
                }
            </td>
            <td>
                {edit
                    ? <>
                        <Button variant="primary" onClick={handleSave}>Save</Button>
                        <Button variant="success ml-2" onClick={handleCancel}>Cancel</Button>
                    </>
                    :
                    <>
                        <Button variant="secondary" onClick={handleEditClick}>Edit</Button>
                        <Button variant="danger ml-2" onClick={handleDeleteClick}>Delete</Button>
                    </>
                }

            </td>
        </tr>
    );
}

export default Row;