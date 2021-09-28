import React from 'react'
import { Link } from 'react-router-dom';
import { Button } from "react-bootstrap";
import { useCollectionData } from 'react-firebase-hooks/firestore';
import firebase, { e_users, e_areas } from "src/utils/firebase"

const TRow = ({ data, id }) => {
    const query = e_areas.where(firebase.firestore.FieldPath.documentId(), '==', data.area)
    const [area, loading] = useCollectionData(query, { idField: 'id' })

    const handleDelte = id => {
        e_users.doc(id).delete()
    }

    return (
        <tr>
            <td>{id + 1}</td>
            <td>{data.registration}</td>
            <td>{data.fullname}</td>
            <td>{data.address}</td>
            <td>
                {loading
                    ? <span>Loading</span>
                    : area[0]?.name}
            </td>
            <td className="p-0">
                <Link className="btn btn-primary" to={`/electricity/users/edit/${data.id}`}>Edit</Link>
                <Button variant="danger" className="ml-1" onClick={() => handleDelte(data.id)}>Delete</Button>
            </td>
        </tr>
    );
}

export default TRow;