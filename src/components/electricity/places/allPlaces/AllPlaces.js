import React from "react";
import { Row, Col, Card, Container } from "react-bootstrap"
import { e_provinces } from 'src/utils/firebase';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import AreaOffices from "./AreaOffices";

const AllPlaces = () => {
    const query = e_provinces.orderBy('createdAt')
    const [provinces, loading] = useCollectionData(query, { idField: 'id' })

    return (
        <Container>
            <Card>
                <Card.Body>
                    <Row className="border">
                        <Col xs={4}>Province</Col>
                        <Col xs={4}>Area Office</Col>
                        <Col xs={4}>Area</Col>
                    </Row>
                    {loading
                        ? <span>Loading</span>
                        : provinces?.map((province, id) => (
                            <Row key={id} className="border align-items-center">
                                <Col xs={4}>{province.name}</Col>
                                <Col xs={8}>
                                    <AreaOffices province={province.id} />
                                </Col>
                            </Row>
                        ))}
                </Card.Body>
            </Card>
        </Container>
    );
}

export default AllPlaces;