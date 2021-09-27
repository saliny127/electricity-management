import React, { Component } from 'react';
import { firebaseLooper } from '../../utils/tools';
import { backOfficeCollection } from '../../utils/firebase';
import Header from '../header';
import { Link } from 'react-router-dom';


class Moderators extends Component {

    state = {
        moderatorDetails: null
    }


    getAllModerators(){
        backOfficeCollection.where('status','==','active').where('role','==','moderator')
        .get()
        .then( snapshot => {
            const moderatorDetails = firebaseLooper(snapshot);
            this.setState({
                moderatorDetails
            });
        });
    }

    
    componentDidMount(){
        this.getAllModerators();
      
        
        /// GET DOC BY ID
        // carsCollection.doc('LqJq2rMLk063JabFSLiy').get().then( snapshot =>{
        //     console.log(snapshot.data())
        // })

        // employeeRef.get().then((snapshot)=>{
        //    const employees = firebaseLooper(snapshot);
        //     console.log(employees);
        // })
    }

    handleModeratorData = (moderatorDetails) => (
        moderatorDetails ? 
        moderatorDetails.map( (data,i) => (
                <tr key={i}>
                    <th>{i+1}</th>
                    <th>{data.name}</th>
                    <th>{data.email}</th>
                    <th>{data.phoneNumber}</th>
                    <th><Link to="">EDIT</Link></th>
                    <th><Link to="">REMOVE</Link></th>
                </tr>
            ))
        : null
    )


    render(){
        return(
            <>
                <Header/>
                <div className="table">
                <Link to="/add_moderator">ADD MODERATOR</Link>
                <table >
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>PhoneNumber</th>
                            <th></th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        { this.handleModeratorData(this.state.moderatorDetails)}
                    </tbody>
                </table>

                </div>
                  
                 
            </>
        )
    }
}

export default Moderators;