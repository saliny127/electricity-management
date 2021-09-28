import React from "react";
import { Form, Card, Container } from "react-bootstrap"
import AllOfafices from "./allOffices";
import AddOffice from './addOffice'
import { useCollectionData } from 'react-firebase-hooks/firestore';
import firebase, { e_areaOffices, e_provinces } from "src/utils/firebase"

const AreaOffices = () => {
    const query = e_provinces.orderBy('createdAt')
    const [provinces, loading] = useCollectionData(query, { idField: 'id' })
    return (
        <Container>
            <Card>
                <Card.Body>
                    <AllOfafices provinces={provinces} />
                    <AddOffice provinces={provinces} />
                </Card.Body>
            </Card>
        </Container>
    );
}

export default AreaOffices;