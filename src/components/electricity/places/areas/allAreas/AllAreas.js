import React, { useEffect } from 'react';
import { e_areas } from 'src/utils/firebase';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { Container, Table } from 'react-bootstrap'
import Row from './Row'

const AllAreas = ({ areaOffices }) => {
    const query = e_areas.orderBy('createdAt')
    const [areas, loading] = useCollectionData(query, { idField: 'id' })

    return (
        <>
            <Container className="mx-auto">
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Areae</th>
                            <th>Area Office</th>
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
                            : areas && areas.map((data, id) => (
                                <Row key={id} id={id} data={data} areaOffices={areaOffices} />
                            ))}
                    </tbody>
                </Table>
            </Container>
        </>
    );
}

export default AllAreas;