import React  from 'react';
import {Form, Col} from 'react-bootstrap';

const Address = (props)=>{
    console.log("address data");
    console.log(props.add);
   return(
        
            <Form.Group>
                <Form.Label>Address</Form.Label>
                <Form.Row>
                <Col>
                    <Form.Control 
                    type="text" 
                    placeholder="House Number"
                    name="HouseNo"
                    onChange={props.onChange}
                    value={props.add.House_No}                
                    />
                </Col>
                <Col>
                    <Form.Control 
                    type="text" 
                    placeholder="Street"
                    name="Street"
                    onChange={props.onChange}   
                    value={props.add.Street}     
                    />
                </Col>
                <Col>
                    <Form.Control 
                    type="text" 
                    placeholder="City"
                    name="City"
                    onChange={props.onChange}
                    value={props.add.City}  
                    />
                </Col>
                </Form.Row>
            </Form.Group>
            
            
        
    );
}


export default Address;