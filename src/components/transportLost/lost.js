import React, { Component } from 'react';
import { firebaseLooper } from '../../utils/tools';
import { lostDetailsCollection } from '../../utils/firebase';
import Header from '../header';
import Footer from '../footer';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';


class LostDetails extends Component {

    state = {
        lostDetails: null
    }


    getAllTheLostDetails(){
        lostDetailsCollection
        .get()
        .then( snapshot => {
            const lostDetails = firebaseLooper(snapshot);
            this.setState({
                lostDetails
            });
        });
    }

    
    componentDidMount(){
        this.getAllTheLostDetails();
      
        
        /// GET DOC BY ID
        // carsCollection.doc('LqJq2rMLk063JabFSLiy').get().then( snapshot =>{
        //     console.log(snapshot.data())
        // })

        // employeeRef.get().then((snapshot)=>{
        //    const employees = firebaseLooper(snapshot);
        //     console.log(employees);
        // })
    }

    handleLostData = (lostDetails) => (
        lostDetails ? 
            lostDetails.map( (data,i) => (
                //console.log(lostDetails[i].id),
                <tr key={i}>
                    <th>{data.reference_no}</th>
                    <th>{data.medium}</th>
                    <th>{data.route_origin}-{data.route_destination}</th>
                    <th>{data.lost_items}</th>
                    <th>{data.email}</th>
                    <th>{data.status}</th>
                    <th><Link to={`/transport-lostdetails-view/${lostDetails[i].id}`}><Button>VIEW</Button></Link></th>
                </tr>
            ))
        : null
    )


    render(){
        return(
            <>
                <Header />
                <table className="table ">
                    <thead>
                        <tr>
                            <th>Ref.No</th>
                            <th>Medium</th>
                            <th>Route</th>
                            <th>Lost Items</th>
                            <th>Client</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        { this.handleLostData(this.state.lostDetails)}
                    </tbody>
                </table>
                <br/> 
                <Footer/>   
            </>
        )
    }
}

export default LostDetails;