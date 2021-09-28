import React from "react";
import { Form, Card, Container } from "react-bootstrap"
import AllAreas from "./allAreas";
import AddArea from './addArea'
import { useCollectionData } from 'react-firebase-hooks/firestore';
import firebase, { e_areaOffices, e_provinces } from "src/utils/firebase"

const Areas = () => {
    const query = e_areaOffices.orderBy('createdAt')
    const [areaOffices] = useCollectionData(query, { idField: 'id' })
    return (
        <Container>
            <Card>
                <Card.Body>
                    <AllAreas areaOffices={areaOffices} />
                    <AddArea areaOffices={areaOffices} />
                </Card.Body>
            </Card>
        </Container>
    );
}

export default Areas;