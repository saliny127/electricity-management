import React, { Component, useEffect, useState } from 'react';
import firebase, { e_complains, e_users, clients } from 'src/utils/firebase';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { useHistory, useParams } from 'react-router';
import { Link } from 'react-router-dom';
import "./eViewComplain.css"
import { Button, Card, Col, Row } from 'react-bootstrap';

const initialState = {
    status: "",
    description: ""
};

const ViewComplaint = () => {
    const [state, setState] = useState(initialState);
    const [data, setData] = useState({});
    const [complaint, setComplaint] = useState({});

    const { status, description } = state;

    const history = useHistory();

    const { id } = useParams();

    const query = e_complains.where(firebase.firestore.FieldPath.documentId(), '==', id)
    const [complain, loading] = useCollectionData(query, { idField: 'id' })

    const userQuery = complain && e_users.where('registration', '==', String(complain[0].account_number))
    const [user, userLoading] = useCollectionData(userQuery, { idField: 'id' })

    const clientQuery = complain && clients.where('user_id', '==', complain[0].user)
    const [client, clientLoading] = useCollectionData(clientQuery, { idField: 'id' })

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setState({ ...state, [name]: value })
    };

    const handleStatusChange = status => {
        e_complains.doc(id).update({ ...complain[0], status })
    }

    useEffect(() => {
        e_complains.doc(`${id}`)
            .get()
            .then((snapshot) => {
                if (snapshot.exists) {
                    setComplaint({ ...snapshot.data() });
                } else {
                    setComplaint({});
                }

            });
    }, [id]);


    console.log({ user });

    useEffect(() => {
        if (id) {
            setState({ ...complaint[id] });
        } else {
            setState({ ...initialState });
        }
        return () => {
            setState({ ...initialState });
        }

    }, [id, complaint]);

    if (loading || userLoading || clientLoading) return <h5>Loading</h5>

    return (
        <div className="card main-card">
            <div className="card-header bg-dark text-center text-white">
                <strong><h5>INQUIRY DETAILS</h5></strong>
            </div>
            <div className="card-body">
                <div className="row">
                    <div className="col-sm-6 w-50">
                        <div className="card my-card-row">
                            <h6 className="card-header my-header bg-dark text-white">Complaint's Details</h6>
                            <div class="my-div">

                                <table class="table my-table table-bordered">
                                    <tbody>
                                        <tr>
                                            <td>Email</td>
                                            <td>{client && client[0]?.email}</td>
                                        </tr>
                                        <tr>
                                            <td>Full Name</td>
                                            <td>{client && `${client[0]?.first_name} ${client[0]?.last_name}`}</td>
                                        </tr>
                                        <tr>
                                            <td>Phone Number</td>
                                            <td>{client && client[0]?.phone_number}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <br />
                        <div className="card my-card-row">
                            <h6 className="card-header my-header bg-dark text-white">Complaint Details</h6>
                            <div class="my-div">
                                <table class="table my-table table-bordered">
                                    <tbody>
                                        <tr>
                                            <td>Type</td>
                                            <td>{complain && complain[0]?.complain_type}</td>
                                        </tr>
                                        <tr>
                                            <td>Complaint</td>
                                            <td>{complain && complain[0]?.complaint}</td>
                                        </tr>
                                        <tr>
                                            <td>Description</td>
                                            <td>{complain && complain[0]?.description}</td>
                                        </tr>
                                        <tr>
                                            <td>Status</td>
                                            <td>{complain && complain[0]?.status}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-6">
                        <div className="card my-card-row">
                            <h6 className="card-header bg-dark my-header text-white">Client Details</h6>
                            <div class="my-div">


                                <table class="table my-table table-bordered">
                                    <tbody>
                                        <tr>
                                            <td>Registration number</td>
                                            <td>{user && user[0]?.registration}</td>
                                        </tr>
                                        <tr>
                                            <td>Full name</td>
                                            <td>{user && user[0]?.fullname}</td>
                                        </tr>
                                        <tr>
                                            <td>Complain</td>
                                            <td>{complaint.complaint}</td>
                                        </tr>
                                    </tbody>
                                </table>

                            </div>
                        </div>
                        <br />
                        <div className="card my-card-row">
                            <h6 className="card-header my-header bg-dark text-white">Status</h6>
                            <div class="my-div">


                                <table class="table my-table table-bordered">
                                    <tbody>
                                        <tr>
                                            <td>Status</td>
                                            <td>{complain && complain[0]?.status}</td>
                                        </tr>
                                        <tr>
                                            <td>Action</td>
                                            <td>
                                                <Button variant="success" onClick={() => handleStatusChange('sent')}>Open</Button>
                                                <Button variant="danger" onClick={() => handleStatusChange('rejected')}>Reject</Button>
                                                <Button variant="warning" onClick={() => handleStatusChange('finished')}>Finish</Button>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>

                            </div>

                        </div>
                    </div>
                </div>
                <br />
                <Button className="btn btn-md btn-secondary" onCLick={{}}>Back</Button>
            </div>
        </div>
    )

}

export default ViewComplaint;