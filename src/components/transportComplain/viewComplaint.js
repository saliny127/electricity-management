import React, { Component, useEffect, useState } from 'react';
import { transportComplaintsCollection } from '../../utils/firebase';
import { useHistory, useParams } from 'react-router';
import { Link } from 'react-router-dom';
import "./viewComplaint.css"
import { Button, Card, Col, Row } from 'react-bootstrap';

const initialState={
    status:"",
    description:""
};

const ViewComplaint = () => {
    const [state,setState]=useState(initialState);
    const [data,setData]=useState({});

    const [complaint, setComplaint] = useState({});

    const{status,description}=state;

    const history=useHistory();

    const{id}=useParams();
    console.log(id);

    const handleInputChange = (e) => {
        const {name, value} = e.target;
        setState({...state,[name]: value})
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        transportComplaintsCollection.doc(`${id}`).update(state)    
    };

    useEffect(() => {
        transportComplaintsCollection.doc(`${id}`)
        .get()
        .then( (snapshot) => {
            if (snapshot.exists) {
                setComplaint({ ...snapshot.data() });
            } else {
                setComplaint({});
            }
            
        });
    }, [id]);

    console.log("complaint",complaint);

    useEffect(() => {
        if(id){
            setState({...complaint[id]});
        }else{
            setState({...initialState});
        }
        return ()=>{
            setState({...initialState});
        }

    }, [id,complaint]);

    


    return(
        <div>
            <Card className="card">
                <Card.Header>
                <div className="card-header">
                    <strong><p>INQUIRY DETAILS</p></strong>
                </div>
                </Card.Header>   
                <div className="container">
                    <Row>
                        <Col>
                            <strong>REFERENCE NO : </strong>
                            <span>{complaint.reference_no}</span>
                            <br/>
                            <br/>
                            <strong>MEDIUM : </strong>
                            <span>{complaint.medium}</span>
                            <br/>
                            <br/>
                            <strong>ROUTE-ORIGIN : </strong>
                            <span>{complaint.route_origin}</span>
                            <br/>
                            <br/>
                            <strong>ROUTE-DESTINATION : </strong>
                            <span>{complaint.route_destination}</span>
                            <br/>
                            <br/>
                            <strong>DATE : </strong>
                            <span>{complaint.complaint_date}</span>
                            <br/>
                            <br/>
                            <strong>GETOFF TIME : </strong>
                            <span>{complaint.get_off_time}</span>
                            <br/>
                            <br/>
                            <strong>GETOFF PLACE : </strong>
                            <span>{complaint.get_off_place}</span>
                            <br/>
                            <br/>
                            <strong>VEHICLE DETAILS : </strong>
                            <span>{complaint.vehicle_details}</span>
                            <br/>
                            <br/>
                            <strong>COMPLAINT : </strong>
                            <span>{complaint.complaint}</span>
                            <br/>
                            <br/>
                        </Col>
                        <Col>
                            <strong>CLIENT DETAILS</strong>
                            <hr/>
                            <strong>NAME : </strong>
                            <span>{complaint.last_name}</span>
                            <br/>
                            <br/>
                            <strong>EMAIL  : </strong>
                            <span>{complaint.email}</span>
                            <br/>
                            <br/>
                            <strong>PHONE NUMBER : </strong>
                            <span>{complaint.phone_number}</span>            
                            <br/>
                            <br/>
                            <strong>NIC : </strong>
                            <span>{complaint.nic}</span>
                            <br/>
                            <br/>
                            <hr/>
                            <strong>STATUS</strong>
                            <br/>
                            <br/>
                            <form onSubmit={handleSubmit}>
                            <label><strong>STATUS : </strong></label>
                            <input type="string" defaultValue={complaint.status} id="status" name="status" placeholder="status" onChange={handleInputChange} />
                            <br/>
                            <label><strong>DESCRIPTION : </strong></label>
                            <input type="string" id="description" name="description" placeholder="description" defaultValue={complaint.description || description || ""} onChange={handleInputChange} />
                            <Button type="submit" value="save">Save Changes</Button>
                            </form>                            
                        </Col>
                    </Row>
                    <Button onSubmit={{}}>Back</Button>
                    <br/>
                    <br/>
                    <br/>
                    <div></div>              
                </div>
            </Card>
        </div>
    )
}

export default ViewComplaint;