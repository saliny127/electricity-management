import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import { useHistory } from 'react-router-dom'
import { Form, Card, Container, Row, Col, Button } from "react-bootstrap"
import firebase, { e_schedules, e_areas } from "src/utils/firebase"
import { useCollectionData } from "react-firebase-hooks/firestore";
import Autocomplete from 'react-autocomplete'
import Schedules from "..";

const SetArea = () => {
    const { id } = useParams()

    const areaQuery = e_areas.orderBy('createdAt')
    const [areas, areaLoading] = useCollectionData(areaQuery, { idField: 'id' })

    const query = e_schedules.where(firebase.firestore.FieldPath.documentId(), '==', id)
    const [schedule, loading] = useCollectionData(query, { idField: 'id' })

    const [autocomplete, setAutocomplete] = useState('')

    const [values, setValues] = useState({ date: '', timeFrom: '', timeTo: '' })
    const [submitting, setSubmitting] = useState(false)
    const [scheduleAreas, setScheduleAreas] = useState([])

    const history = useHistory()

    const handleValueChange = e => {
        e.persist();
        setValues(values => ({ ...values, [e.target.name]: e.target.value }))
    }

    const handleRemove = id => {
        setScheduleAreas(areas => {
            return areas.filter((area, _id) => id !== _id)
        })
    }

    const handleFormSubmit = (e) => {
        e.preventDefault();
        setSubmitting(true)
        e_schedules.doc(id).update({ ...schedule[0], areas: scheduleAreas.map(area => area.id) }).then(data => {
            history.push(`/electricity/schedules`)
            setSubmitting(false)
        }).catch(e => {
            console.log(e);
        })
    }

    useEffect(() => {
        if (!schedule || !areas) return
        setScheduleAreas(areas.filter(area => schedule[0].areas.includes(area.id)))
    }, [schedule, areas])

    var autocompleteId = 0;
    if (loading || areaLoading) return <h4>Please wait</h4>
    return (
        <Container>
            <Card>
                <Card.Body>
                    <h2 className="text-center mb-4">Add Areas</h2>
                    <Form onSubmit={handleFormSubmit}>
                        <Row key={id} className="border text-white bg-secondary p-2">
                            <Col xs={2}>No</Col>
                            <Col xs={8}>Areas</Col>
                            <Col xs={2}>Action</Col>
                        </Row>
                        {scheduleAreas.map((area, id) => (
                            <Row key={id} className="border p-2">
                                <Col xs={2}>{id + 1}</Col>
                                <Col xs={8}>{area.name}</Col>
                                <Col xs={2}>
                                    <Button variant="secondary" onClick={() => handleRemove(id)}>Remove</Button>
                                </Col>
                            </Row>
                        ))}
                        <Row className="border">
                            <Col xs={2}></Col>
                            <Col xs={8}>
                                <Autocomplete
                                    items={areas || []}
                                    shouldItemRender={(item, value) => item.name?.toLowerCase().indexOf(value.toLowerCase()) > -1}
                                    getItemValue={item => item}
                                    renderItem={(item, highlighted) =>
                                        <div
                                            key={autocompleteId++}
                                            style={{
                                                backgroundColor: highlighted ? '#eee' : 'transparent',
                                                padding: '0.75rem 1.25rem',
                                                border: '1px solid transparent',
                                                borderRadius: '0.25rem',
                                                color: '#6b6d7a',
                                                borderColor: '#f1f2f4',
                                                userSelect: "none",
                                                zIndex: 100
                                            }}
                                        >
                                            {item.name}
                                        </div>
                                    }
                                    value={autocomplete}
                                    onChange={e => setAutocomplete(e.target.value)}
                                    onSelect={value => {
                                        setScheduleAreas(areas => {
                                            const removed = areas.filter(area => area.id !== value.id)
                                            return [...removed, value]
                                        })
                                    }}
                                    inputProps={{
                                        className: "form-control",
                                        placeholder: 'Search area...'
                                    }}
                                    menuStyle={{
                                        borderRadius: '3px',
                                        boxShadow: '0 2px 12px rgba(0, 0, 0, 0.1)',
                                        background: 'rgba(255, 255, 255, 0.9)',
                                        padding: '2px 0',
                                        fontSize: '90%',
                                        position: 'fixed',
                                        overflow: 'auto',
                                        maxHeight: '50%',
                                        marginBottom: '1rem',
                                        border: '2px solid transparent',
                                        color: '#6b6d7a',
                                        backgroundColor: '#f5f6f7',
                                        borderColor: '#f1f2f4',
                                        zIndex: 100,
                                    }}
                                    wrapperProps={{
                                        style: {
                                            display: 'block',
                                            position: "relative"
                                        }
                                    }}
                                />
                            </Col>
                            <Col xs={2}></Col>
                        </Row>
                        <Button block variant="primary m-2" type="submit" disabled={submitting}>Save</Button>
                    </Form>
                </Card.Body>
            </Card>
        </Container>
    )
}

export default SetArea;