import React from "react";
import { Row, Col, Card, Container } from "react-bootstrap"
import firebase, { e_areas } from 'src/utils/firebase';
import { useCollectionData } from 'react-firebase-hooks/firestore';

const Areas = ({ areaOffice }) => {
    const query = e_areas.where('areaOffice', '==', areaOffice || '')
    const [areas, loading] = useCollectionData(query, { idField: 'id' })

    console.log(areas)

    return (
        <>
            {loading
                ? <span>Loading</span>
                : areas?.length == 0
                    ? <Row className="border align-items-center">
                        <Col xs={12}>No Areas</Col>
                    </Row>
                    : areas?.map((area, id) => (
                        <Row key={id} className="border align-items-center">
                            <Col xs={12}>{area.name}</Col>
                        </Row>
                    ))}
        </>
    );
}

export default Areas;