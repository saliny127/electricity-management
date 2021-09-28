import React, { useState, useEffect } from "react";
import firebase, { e_areaOffices, e_provinces } from "src/utils/firebase";
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { Button } from "react-bootstrap"

const Row = ({ data, id, provinces }) => {
    const query = e_provinces.where(firebase.firestore.FieldPath.documentId(), '==', data.province)
    const [province, loading] = useCollectionData(query, { idField: 'id' })
    const [edit, setEdit] = useState(false)
    const [value, setValue] = useState(data.name)
    const [editedProvince, setEditedProvince] = useState(data.province)
    const [submitting, setSubmitting] = useState(false)

    const handleEditClick = () => {
        setEdit(!edit)
    }

    const changeHandler = e => {
        setValue(e.target.value)
    }

    const selectHandler = e => {
        setEditedProvince(e.target.value)
    }

    const handleSave = () => {
        setSubmitting(true)
        e_areaOffices.doc(data.id).update({ name: value, province: editedProvince }).then(() => {
            setEdit(false)
            setSubmitting(false)
        })
    }

    const handleDeleteClick = () => {
        e_areaOffices.doc(data.id).delete()
    }

    const handleCancel = () => {
        setEdit(false)
    }

    useEffect(() => {
        console.log(data.province, province)
    }, [province])

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
                    ? <select className="form-control" onChange={selectHandler} value={editedProvince}>
                        {provinces?.map((pro, id) => (
                            <option key={id} value={pro.id} >{pro.name}</option>
                        ))}
                    </select>
                    :
                    !loading && province[0]?.name
                }
            </td>
            <td>
                {edit
                    ? <>
                        <Button variant="primary" onClick={handleSave} disabled={submitting}>Save</Button>
                        <Button variant="success ml-2" onClick={handleCancel} disabled={submitting}>Cancel</Button>
                    </>
                    :
                    <>
                        <Button variant="secondary" onClick={handleEditClick} disabled={submitting}>Edit</Button>
                        <Button variant="danger ml-2" onClick={handleDeleteClick} disabled={submitting}>Delete</Button>
                    </>
                }

            </td>
        </tr>
    );
}

export default Row;