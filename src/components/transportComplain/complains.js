import React, { Component } from 'react';
import { firebaseLooper } from '../../utils/tools';
import { transportComplaintsCollection } from '../../utils/firebase';
import Header from '../header';
import Footer from '../footer';
import { Button } from 'react-bootstrap';
import '../home/home.css'
import { Link } from 'react-router-dom';


class TransportComplaints extends Component {

    state = {
        complaintDetails: null
    }


    getAllTransportComplaints(){
        transportComplaintsCollection
        .get()
        .then( snapshot => {
            const complaintDetails = firebaseLooper(snapshot);
            this.setState({
                complaintDetails
            });
        });
    }

    
    componentDidMount(){
        this.getAllTransportComplaints();
      
        
        /// GET DOC BY ID
        // carsCollection.doc('LqJq2rMLk063JabFSLiy').get().then( snapshot =>{
        //     console.log(snapshot.data())
        // })

        // employeeRef.get().then((snapshot)=>{
        //    const employees = firebaseLooper(snapshot);
        //     console.log(employees);
        // })
    }

    handleComplaintData = (complaintDetails) => (
        complaintDetails ? 
        complaintDetails.map( (data,i) => (
                <tr key={i}>
                    <th>{data.reference_no}</th>
                    <th>{data.medium}</th>
                    <th>{data.route_origin}-{data.route_destination}</th>
                    <th>{data.complaint}</th>
                    <th>{data.email}</th>
                    <th><Link to={`/transport-complaint-view/${complaintDetails[i].id}`}><Button>VIEW</Button></Link></th>
                </tr>
            ))
        : null
    )


    render(){
        return(
            <>
                <Header/>
                <table className="table">
                    <thead>
                        <tr>
                            <th style={{width:60}}>Ref.No</th>
                            <th style={{width:50}}>Medium</th>
                            <th style={{width:300}}>Route</th>
                            <th style={{width:500}}>Complaint</th>
                            <th style={{width:40}}>Client</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        { this.handleComplaintData(this.state.complaintDetails)}
                    </tbody>
                </table> 
                <br/> 
                <Footer/>  
            </>
        )
    }
}

export default TransportComplaints;