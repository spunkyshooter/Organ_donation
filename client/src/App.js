import React, {Component} from 'react';
import CustomNavbar from './components/Navbar';
import DRForm from './components/DRForm';
import Landing from './components/landing';
import {BrowserRouter as Router,Route} from 'react-router-dom';
import './App.css';
import { Container ,Row,Col} from 'react-bootstrap';
import Dashboard from './components/Dashboard'
import Footer from './components/Footer';

class App extends Component{
render(){
  let data = {
  fName : '',
  gender:"Male",
  organ:"",
  ABO:"",
  Hospital:""
}
  return (
    <Router>
      <CustomNavbar />
      
      <Route exact path="/" component={Landing} />
      <Container>
        <Row>
          <Col md={{span:6, offset:3}}>
              <Route exact path="/donate" 
                 render={() => <DRForm  btnName={"Donate"} data={data}/> }
              />
          </Col>
          <Col md={{span:6, offset:3}}>
              <Route exact path="/receive" 
                  render={() => <DRForm  btnName={"Receive"} data={data}/>}
               />
          </Col>
          <Col md={{span:11,offset:1}}>
              <Route exact path="/dashboard" component={Dashboard} />
          </Col>
        </Row>        
      </Container>
     <Footer/>
    
    </Router>
  );
}

}
  

export default App;