import { render } from "@testing-library/react"
import React, { Component } from "react"
import { Form, Button, Card, Alert } from "react-bootstrap"
import { Link } from "react-router-dom"
import Footer from "../footer"
import Header from "../header"


class Profile extends Component{

  /* state = {
    user: {
        email:firebase.auth().currentUser.email,
        password:''
    }
}

handleForm = (e) => {
    e.preventDefault();
    const {email} = this.state.user;
    const {password} = this.state.user;

    if(this.state.register){
        firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then( user =>{
            this.handleStoreRegisterUser(user);
            user.user.sendEmailVerification().then(()=>{
                console.log('mail sent');
            })
        })
        .catch(e =>{
            console.log(e);
        });
    } else {
        firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then( response =>{
            console.log(response)
        })
        .catch(e =>{
            console.log(e);
        });
    }
}

changeHandler = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    this.setState( prevState => ({
        user:{
            ...prevState.user,
            [name]: value
        }
    }))
}

handleUpdateEmail = () => {
  let getUser = firebase.auth().currentUser;
  let credential = firebase.auth.EmailAuthProvider
                  .credential(email,password);

  if(getUser){
      getUser.reauthenticateWithCredential(credential).then( res => {
          getUser.updateEmail(email);
          getUser.updatePassword(password);
      })

  }
}

handleUpdateProfile = () => {
  let getUser = firebase.auth().currentUser;
  if(getUser){
      getUser.updateProfile({
          displayName:"Steve",
          photoURL: "https://jsjs.com/photo.jpeg"
      }).then(()=>{
          console.log(getUser);
      })
  }
}

handleStoreRegisterUser = (data) => {
  usersCollection.doc(data.user.uid).set({
      email: data.user.email
  }).then( data =>{
      console.log(data)
  }).catch(e => {
      console.log(e);
  })
}
 */


    render(){
        return (
            <>
            <Header/>
              <Card>
                <Card.Body>
                  <h2 className="text-center mb-4">Update Profile</h2>
                  {/* {error && <Alert variant="danger">{error}</Alert>} */}
                  {/* <Form onSubmit={handleSubmit}>
                    <Form.Group id="email">
                      <Form.Label>Email</Form.Label>
                      <Form.Control
                        type="email"
                        name="email"
                        required
                        //defaultValue={"currentUser.email"}
                      />
                    </Form.Group>
                    <Form.Group id="password">
                      <Form.Label>Password</Form.Label>
                      <Form.Control
                        type="password"
                        name="password"
                        placeholder="Leave blank to keep the same"
                      />
                    </Form.Group>
                    {<Form.Group id="password-confirm">
                      <Form.Label>Password Confirmation</Form.Label>
                      <Form.Control
                        type="password"
                        name="password"
                        placeholder="Leave blank to keep the same"
                      />
                    </Form.Group>}
                    <Button  className="w-100" type="submit">
                      Update
                    </Button>
                  </Form> */}
                </Card.Body>
              </Card>
              <div className="w-100 text-center mt-2">
                <Link to="/">Cancel</Link>
              </div>
              <Footer/>
            </>
          )
    
    }
}

export default Profile;

