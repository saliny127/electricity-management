import React, { Component, useEffect, useState } from 'react';
import firebase, { e_powercut, e_users, clients } from 'src/utils/firebase';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { useHistory, useParams } from 'react-router';
import { Link } from 'react-router-dom';
import "./eViewPowerfaiureComplain.css"
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

    const query = e_powercut.where(firebase.firestore.FieldPath.documentId(), '==', id)
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
        e_powercut.doc(id).update({ ...complain[0], status })
    }

    useEffect(() => {
        e_powercut.doc(`${id}`)
            .get()
            .then((snapshot) => {
                if (snapshot.exists) {
                    setComplaint({ ...snapshot.data() });
                } else {
                    setComplaint({});
                }

            });
    }, [id]);


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
                            <h6 className="card-header my-header bg-dark text-white">Client's Details</h6>
                            <div className="my-div">

                                <table className="table my-table table-bordered">
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
                            <div className="my-div">
                                <table className="table my-table table-bordered">
                                    <tbody>
                                        <tr>
                                            <td>Date-time</td>
                                            <td>{complain && complain[0]?.date_time.toDate().toString().split('G')[0]}</td>
                                        </tr>
                                        <tr>
                                            <td>CreatedAt</td>
                                            <td>{complain && complain[0]?.createdAt.toDate().toString().split('G')[0]}</td>
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
                            <h6 className="card-header bg-dark my-header text-white">Account Details</h6>
                            <div className="my-div">


                                <table className="table my-table table-bordered">
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
                                            <td>Address</td>
                                            <td>{user && user[0]?.address}</td>
                                        </tr>
                                    </tbody>
                                </table>

                            </div>
                        </div>
                        <br />
                        <div className="card my-card-row">
                            <h6 className="card-header my-header bg-dark text-white">Status</h6>
                            <div className="my-div">


                                <table className="table my-table table-bordered">
                                    <tbody>
                                        <tr>
                                            <td>Status</td>
                                            <td>{complain && complain[0]?.status}</td>
                                        </tr>
                                        <tr>
                                            <td>Action</td>
                                            <td>
                                                <Button variant="success" onClick={() => handleStatusChange('sent')}>Sent</Button>
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
            </div>
        </div>
    )

}

export default ViewComplaint;