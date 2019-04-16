import React from "react";
import {Navbar, Nav} from 'react-bootstrap';


const CustomNavbar = () => {
    return (
      
            <Navbar variant="dark" className="Navbarcolor">
                <Navbar.Brand href="/">
                    <img
                    alt=""
                    src={process.env.PUBLIC_URL + '/assets/logo.png'}
                    width="30"
                    height="30"
                    className="d-inline-block align-top"
                    />
                    {' Organ Donation'}
                </Navbar.Brand>
                <Nav>
                <Nav.Link href="/donate" >Donate</Nav.Link>
                <Nav.Link href="/receive" >Receive</Nav.Link>
                <Nav.Link href="/dashboard" >Dashboard</Nav.Link>
                </Nav>
                </Navbar>

    );
}
    
 export default CustomNavbar;