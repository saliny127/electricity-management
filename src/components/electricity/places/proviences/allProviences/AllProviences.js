import React, { useState, useEffect } from 'react';
import { firebaseLooper } from 'src/utils/tools';
import { e_provinces } from 'src/utils/firebase';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { Link } from 'react-router-dom';
import { Container, Col, Table } from 'react-bootstrap'
import Row from './Row'

const AllPlaces = () => {
    const query = e_provinces.orderBy('createdAt')
    const [provinces, loading] = useCollectionData(query, { idField: 'id' })

    // useEffect(() => {
    //     e_provinces.get().then(snapshot => {
    //         setPoviences(firebaseLooper(snapshot));
    //     })
    // }, [])

    useEffect(() => {
        console.log(provinces)
    }, [provinces])
    return (
        <>
            <Container className="mx-auto">
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Province</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading
                            ?
                            <tr>
                                <td colSpan="3">
                                    loading
                                </td>
                            </tr>
                            : provinces && provinces.map((data, id) => (
                                <Row key={id} id={id} data={data} />
                            ))}
                    </tbody>
                </Table>
            </Container>
        </>
    );
}

export default AllPlaces;