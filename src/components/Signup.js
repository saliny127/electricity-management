import React, { Component } from "react"
import { Form, Button, Card, Alert } from "react-bootstrap"
import { useAuth,AuthProvider } from "../contexts/AuthContext"
import firebase,{auth,db,app,backOfficeCollection} from "../utils/firebase"

class SignUp extends Component {

  state = {
      register: true,
      user: {
          email:'',
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
        .then( user =>{this.handleStoreRegisterUser(user)    
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

  
  handleStoreRegisterUser = (data) => {
      backOfficeCollection.doc(data.user.uid).set({
          email: data.user.email
      }).then( data =>{
          console.log(data)
      }).catch(e => {
          console.log(e);
      })
  }


  render(){
      return(
          <>
          <Card>
              <Card.Body>
              <h2 className="text-center mb-4">Sign Up</h2>
                <Form onSubmit={ (e)=> this.handleForm(e) }>
                  <div className="form-group">
                      <label>Email</label>
                      <input
                          type="email"
                          className="form-control"
                          name="email"
                          onChange={ (e) => this.changeHandler(e)}
                      >
                      </input>
                  </div>
                  <div className="form-group">
                      <label>Password</label>
                      <input
                          type="password"
                          className="form-control"
                          name="password"
                          onChange={ (e) => this.changeHandler(e)}
                      >
                      </input>
                  </div>
                  <button type="submit" className="btn btn-primary">
                      Register
                  </button>
              </Form>
              </Card.Body>
          </Card>
          </>
      )
  }
}

export default SignUp;



