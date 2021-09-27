import React, { Component } from "react"
import { Form, Button, Card } from "react-bootstrap"
import { useAuth } from "../../contexts/AuthContext"
import { Link } from "react-router-dom"
import firebase from "../../utils/firebase"


class LogIn extends Component{
  state = {
    login:false,
    user: {
        email:'',
        password:''
    }
}

handleForm = (e) => {
    e.preventDefault();
    const {email} = this.state.user;
    const {password} = this.state.user;

    try {
      firebase
      .auth()
      .signInWithEmailAndPassword(email, password).then(this.setState({login:true})); 
      //this.props.history.push('/home'); 
      //this.setState(login =>({login:true}))
    } catch (error) {
      this.setState({login:false});
      console.log(error);
    }

    
      /* firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then( user =>{
            console.log(user.user.uid)
        })
        .catch(e =>{
            console.log(e);
        });
        this.props.history.push('/home'); */
        
    

        
        
    
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

componentDidUpdate(){
  if(this.state.login){
    console.log(this.state.login);
    window.location.assign("/home");
  }

}



  render(){
    return (
      <>
        <Card className="align-center justify-center">
          <Card.Body>
            <h2 className="text-center mb-4">Log In</h2>
            
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
                  <Button type="submit" className="w-100">
                      LOGIN
                  </Button>
              </Form>
            <div className="w-100 text-center mt-3">
              <Link to="/forgot-password">Forgot Password?</Link>
            </div>
          </Card.Body>
        </Card>
      </>
    )
  }

}

export default LogIn;

  

