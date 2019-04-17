import React from 'react';
import {Container,Row,Col,Jumbotron, Button} from 'react-bootstrap';
import {Link} from 'react-router-dom';

const Landing = () => (

    <Container style={{marginTop:30}} >
        <Row>
          <Col sm={12} md={6}>
          {/* this is how we pass images */}
            <img src={process.env.PUBLIC_URL + '/assets/oldmaninbed.jpg'} width="100%" alt="organDonation"/>
          </Col>
          <Col>
              <Jumbotron className="jumbo">
                <h1>
                Save Life Donate Organ
                </h1>
              </Jumbotron>
        <div>
          <p style={{fontSize:20}}>
          Every day, lives are saved and improved by the gift of life, sight and health.
          Even though 145 million people in the U.S. have registered as donors, we all need to sign up.
          people are waiting for an organ.
          </p>
          <Link to="/donate"><Button variant="outline-primary">Donate</Button></Link>

        </div>
          {/* <Donate /> */}
          </Col>
        </Row>
      </Container>
);

export default  Landing;