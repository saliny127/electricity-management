import React, { useEffect } from 'react';
import { e_areaOffices } from 'src/utils/firebase';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { Container, Table } from 'react-bootstrap'
import Row from './Row'

const AllOffices = ({ provinces }) => {
    const query = e_areaOffices.orderBy('createdAt')
    const [areaOffices, loading] = useCollectionData(query, { idField: 'id' })

    return (
        <>
            <Container className="mx-auto">
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Area Office</th>
                            <th>Province</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading
                            ?
                            <tr>
                                <td colSpan="4">
                                    loading
                                </td>
                            </tr>
                            : areaOffices && areaOffices.map((data, id) => (
                                <Row key={id} id={id} data={data} provinces={provinces} />
                            ))}
                    </tbody>
                </Table>
            </Container>
        </>
    );
}

export default AllOffices;