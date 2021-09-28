import React, { Component, useEffect, useState } from 'react';
import firebase, { e_complains, e_users } from 'src/utils/firebase';
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

    const userQuery = complain && e_users.where(firebase.firestore.FieldPath.documentId(), '==', complain[0].user)
    const [user, userLoading] = useCollectionData(userQuery, { idField: 'id' })

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setState({ ...state, [name]: value })
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        e_complains.doc(`${id}`).update(state)
    };

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


    console.log("complaint", complaint);

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

    if (loading || userLoading) return <h5>Loading</h5>

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
                                            <td>ID</td>
                                            <td>{id}</td>
                                        </tr>
                                        <tr>
                                            <td>Registration number</td>
                                            <td>{user && user[0]?.registration}</td>
                                        </tr>
                                        <tr>
                                            <td>Full name</td>
                                            <td>{user && user[0].fullname}</td>
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
                            <h6 className="card-header my-header bg-dark text-white">Account Details</h6>
                        </div>
                    </div>
                    <div className="col-sm-6">
                        <div className="card my-card-row">
                            <h6 className="card-header bg-dark my-header text-white">Client Details</h6>


                        </div>
                        <br />
                        <div className="card my-card-row">
                            <h6 className="card-header my-header bg-dark text-white">Status</h6>

                            <form className="m-2" onSubmit={handleSubmit}>
                                <div class="input-group mb-3">
                                    <div class="input-group-prepend">
                                        <span class="input-group-text" id="basic-addon1">STATUS</span>
                                    </div>
                                    <input type="string" class="form-control" defaultValue={complaint.status} id="status" name="status" placeholder="status" onChange={handleInputChange} />
                                </div>
                                <div class="input-group mb-3">
                                    <div class="input-group-prepend">
                                        <span class="input-group-text" id="basic-addon1">DESCRIPTION</span>
                                    </div>
                                    <input type="string" class="form-control" id="description" name="description" placeholder="description" defaultValue={complaint.description || description || ""} onChange={handleInputChange} />

                                </div>
                                <Button className="btn btn-md btn-secondary" type="submit" value="save">Save Changes</Button>
                            </form>
                        </div>
                    </div>
                </div>
                <br />
                <Button className="btn btn-md btn-secondary" onSubmit={{}}>Back</Button>
            </div>
        </div>
    )

}

export default ViewComplaint;