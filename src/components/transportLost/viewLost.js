import React, { Component, useEffect, useState } from 'react';
import { lostDetailsCollection } from '../../utils/firebase';
import { useHistory, useParams } from 'react-router';
import { Link } from 'react-router-dom';
import "./viewLost.css"
import { Button, Card, Col, Row } from 'react-bootstrap';

const initialState={
    status:"",
    description:""
};

const ViewLost = () => {
    const [lost, setLost] = useState({});
    const [state,setState]=useState(initialState);
    const [data,setData]=useState({});

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
        lostDetailsCollection.doc(`${id}`).update(state)    
    };

    useEffect(() => {
        lostDetailsCollection.doc(`${id}`)
        .get()
        .then( (snapshot) => {
            if (snapshot.exists) {
                setLost({ ...snapshot.data() });
            } else {
                setLost({});
            }
            
        });
    }, [id]);
    console.log("lost",lost);

    useEffect(() => {
        if(id){
            setState({...lost[id]});
        }else{
            setState({...initialState});
        }
        return ()=>{
            setState({...initialState});
        }

    }, [id,lost]);

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
                    <span>{lost.reference_no}</span>
                    <br/>
                    <br/>
                    <strong>MEDIUM : </strong>
                    <span>{lost.medium}</span>
                    <br/>
                    <br/>
                    <strong>ROUTE-ORIGIN : </strong>
                    <span>{lost.route_origin}</span>
                    <br/>
                    <br/>
                    <strong>ROUTE-DESTINATION : </strong>
                    <span>{lost.route_destination}</span>
                    <br/>
                    <br/>
                    <strong>LOST ITEM : </strong>
                    <span>{lost.lost_items}</span>
                    <br/>
                    <br/>
                    <strong>LOST ITEM DETAILS : </strong>
                    <span>{lost.lost_item_details}</span>
                    <br/>
                    <br/>
                    <strong>DATE : </strong>
                    <span>{lost.lost_date}</span>
                    <br/>
                    <br/>
                    <strong>GETOFF TIME : </strong>
                    <span>{lost.get_off_time}</span>
                    <br/>
                    <br/>
                    <strong>GETOFF PLACE : </strong>
                    <span>{lost.get_off_place}</span>
                    <br/>
                    <br/>
                    <strong>VEHICLE DETAILS : </strong>
                    <span>{lost.vehicle_details}</span>
                            <br/>
                            <br/>
                        </Col>
                        <Col>
                            <strong>CLIENT DETAILS</strong>
                            <hr/>
                            <strong>NAME : </strong>
                    <span>{lost.last_name}</span>
                    <br/>
                    <strong>EMAIL  : </strong>
                    <span>{lost.email}</span>
                    <br/>
                    <strong>PHONE NUMBER : </strong>
                    <span>{lost.phonenumber}</span>            
                    <br/>
                    <strong>NIC : </strong>
                    <span>{lost.nic}</span>
                            <br/>
                            <br/>
                            <hr/>
                            <strong>STATUS</strong>
                            <br/>
                            <br/>
                            <form onSubmit={handleSubmit}>
                            <label><strong>STATUS : </strong></label>
                            <input type="string" defaultValue={lost.status} id="status" name="status" placeholder="status" onChange={handleInputChange} />
                            <br/>
                            <label><strong>DESCRIPTION : </strong></label>
                            <input type="string" id="description" name="description" placeholder="description" defaultValue={lost.description || description || ""} onChange={handleInputChange} />
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

export default ViewLost;