import React,{ Component } from 'react'
import { Card, CardColumns, Col, Row } from 'react-bootstrap';
import Header from '../header';
import './home.css';

class Home extends Component {

    render(){ 
        return(
            <>
            <Header/>
            <div className="home_body">    
            <div className="container">     
                <Col>
                <Row>
                <Card className="home_card">
                    <Card.Header>PUBLIC TRANSPORT</Card.Header>
                    <Card.Body>sdsdssfsdffGDGSDDSFDSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS</Card.Body>
                </Card>
                </Row>
                <Row>
                <Card>
                    <Card.Header>ELECTRICITY</Card.Header>
                    <Card.Body>sdsdssfsdffGDGSDDSFDSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS</Card.Body>
                </Card>
                </Row>
                <Row>
                <Card>
                    <Card.Header>TELECOMMUNICATION</Card.Header>
                    <Card.Body>sdsdssfsdffGDGSDDSFDSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS</Card.Body>
                </Card>
                </Row>
                </Col>
            </div>           
            </div>           
            </>
        )
    }

}


export default Home;