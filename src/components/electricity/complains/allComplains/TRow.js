import React from 'react'
import { Link } from 'react-router-dom';
import { Button } from "react-bootstrap";
import { useCollectionData } from 'react-firebase-hooks/firestore';
import firebase, { e_users, e_areas, clients } from "src/utils/firebase"

const TRow = ({ data, id }) => {
    const query = e_users.where('registration', '==', String(data.account_number))
    const [user, loading] = useCollectionData(query, { idField: 'id' })

    const clientQuery = clients.where(firebase.firestore.FieldPath.documentId(), '==', data.user)
    const [client, clientLoading] = useCollectionData(clientQuery, { idField: 'id' })

    const handleDelte = id => {
        e_users.doc(id).delete()
    }

    console.log(data.account_number)

    return (
        <tr>
            <td>{id + 1}</td>
            <td>{data.complain_type}</td>
            <td>
                {clientLoading
                    ? <span>Loading</span>
                    : `${client[0]?.first_name} ${client[0]?.last_name}`}
            </td>
            <td>
                {loading
                    ? <span>Loading</span>
                    : user[0]?.fullname}
            </td>
            <td>{data.status}</td>
            <td>{data.complaint}</td>
            <td>{data.description}</td>
            <td className="p-0">
                {/* <Link className="btn btn-primary" to={`/electricity/complains/edit/${data.id}`}>Edit</Link> */}
                <Link className="btn btn-info ml-1" to={`/electricity/complains/view/${data.id}`}>View</Link>
                <Button variant="danger" className="ml-1" onClick={() => handleDelte(data.id)}>Delete</Button>
            </td>
        </tr>
    );
}

export default TRow;