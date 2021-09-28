import React from "react";
import { Row, Col, Card, Container } from "react-bootstrap"
import firebase, { e_areaOffices } from 'src/utils/firebase';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import Areas from "./Areas";

const AreaOffices = ({ province }) => {
    const query = e_areaOffices.where('province', '==', province || '')
    const [areaOffices, loading] = useCollectionData(query, { idField: 'id' })

    return (
        <>
            {loading
                ? <span>Loading</span>
                : areaOffices?.length == 0
                    ? <Row className="border align-items-center">
                        <Col xs={12}>No Area offices</Col>
                    </Row>
                    : areaOffices?.map((office, id) => (
                        <Row key={id} className="border align-items-center">
                            <Col xs={6}>{office.name}</Col>
                            <Col xs={6}>
                                <Areas areaOffice={office.id} />
                            </Col>
                        </Row>
                    ))}
        </>
    );
}

export default AreaOffices;