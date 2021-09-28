import React from 'react'
import { Link } from 'react-router-dom';
import { Button } from "react-bootstrap";
import { useCollectionData } from 'react-firebase-hooks/firestore';
import firebase, { e_users, e_areas } from "src/utils/firebase"

const TRow = ({ data, id }) => {
    const query = e_users.where(firebase.firestore.FieldPath.documentId(), '==', data.user)
    const [user, loading] = useCollectionData(query, { idField: 'id' })

    const handleDelte = id => {
        e_users.doc(id).delete()
    }

    return (
        <tr>
            <td>{id + 1}</td>
            <td>{data.reference}</td>
            <td>
                {loading
                    ? <span>Loading</span>
                    : user[0]?.fullname}
            </td>
            <td>{data.title}</td>
            <td>{data.content}</td>
            <td className="p-0">
                <Link className="btn btn-primary" to={`/electricity/complains/edit/${data.id}`}>Edit</Link>
                <Link className="btn btn-info ml-1" to={`/electricity/complains/view/${data.id}`}>View</Link>
                <Button variant="danger" className="ml-1" onClick={() => handleDelte(data.id)}>Delete</Button>
            </td>
        </tr>
    );
}

export default TRow;