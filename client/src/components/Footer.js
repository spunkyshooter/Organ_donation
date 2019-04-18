import React from "react"
import {Row,Col} from "react-bootstrap"
const Footer = () =>(
    <footer  className="Navbarcolor" style={{color:"white",marginTop:15}}>
    <Row>
        <Col>
            <p style={{paddingTop:20}}>&copy;OrganDonation 2019</p>
            <p>Made with Love...</p>
        </Col>
        <Col>
            <p style={{paddingTop:20}}>Contact Us</p>
            <p>Email:</p>
            <p>Phone NUmber: </p>
        </Col>
        <Col>
        <p style={{paddingTop:20}}>Follow us on</p>
        </Col>
    </Row>
        
    </footer>
);

export default Footer;