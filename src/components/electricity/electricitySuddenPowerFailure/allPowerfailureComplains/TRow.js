import React from 'react'
import { Link } from 'react-router-dom';
import { Button } from "react-bootstrap";
import { useCollectionData } from 'react-firebase-hooks/firestore';
import firebase, { e_users, e_powercut, clients } from "src/utils/firebase";
import { firestore } from 'firebase/app';

const TRow = ({ data, id }) => {
    const query = e_users.where('registration', '==', String(data.account_number))
    const [user, loading] = useCollectionData(query, { idField: 'id' })

    const clientQuery = clients.where(firebase.firestore.FieldPath.documentId(), '==', data.user)
    const [client, clientLoading] = useCollectionData(clientQuery, { idField: 'id' })

    const handleDelte = id => {
        e_powercut.doc(id).delete()
    }
    const strDate = data.date_time.toDate().toString();
    const formatedDate = strDate.split('G')[0];

    return (
        <><tr>
            <td>{id + 1}</td>
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
            <td>{formatedDate}</td>
            <td>{data.status}</td>
            <td>{data.description}</td>
            <td className="p-0">
                {/* <Link className="btn btn-primary" to={`/electricity/complains/edit/${data.id}`}>Edit</Link> */}
                <Link className="btn btn-info ml-1" to={`/electricity/powercut/view/${data.id}`}>View</Link>
                <Button variant="danger" className="ml-1" onClick={() => handleDelte(data.id)}>Delete</Button>
            </td>
        </tr></>
    );
}

export default TRow;