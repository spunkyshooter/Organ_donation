import React ,{Component} from 'react';
import {Form, Button, Container,Row,Col} from 'react-bootstrap';
import Address from './Address.js';
import axios from 'axios';
class DRForm extends Component {
    constructor(props){
        super(props);
        this.state = {...this.props.data}

    }

  onChangeHandler= (event) => {
        let form = event.target

        this.setState({
            [form.name] :form.value
        })
        // console.log(this.state)
    }

    onSubmitHandler = (event) =>{
        console.log(this.state)
        // event.preventDefault()
        let data = {...this.state}
        let url = ""
        if(this.props.btnName === "Update"){
            url = `http://localhost:3002/api/receive/edit/${this.state.RID}`
        }
        else if(this.props.btnName === "Donate"){
            url = "http://localhost:3002/api/donate"
        }else {
            url = "http://localhost:3002/api/receive"
        }

       if(this.props.btnName === "Update"){
           console.log("haha\n")
           console.log(data);
            axios.put(url,data)
            .then(res => console.log(res.data))
            .catch(err => console.log(err))
       }
       else{
         
        axios.post(url,data)
        .then(res => console.log(res.data))
        .catch(err => console.log(err))
       }

    }

    render(){
        const bttName = this.props.btnName;
        console.log(this.state);
        return (
            <Container className="Formback">
                <Row>
                    <Col >
                        <Form onSubmit={this.onSubmitHandler}>
                            <Form.Group controlId="formName">
                                <Form.Label>Full Name</Form.Label>
                                <Form.Control
                                    type="name"
                                    placeholder="Enter full name"
                                    name= "fName"
                                    onChange={this.onChangeHandler}
                                    value={this.state.fName}
                                    required
                                />
                                <Form.Text className="text-muted">
                                We'll never share your name with anyone else.
                                </Form.Text>
                            </Form.Group>

                            < Form.Group controlId="exampleForm.ControlSelect1">
                                <Form.Label>sex</Form.Label>
                                <Form.Control as="select"
                                onChange={this.onChangeHandler}
                                name="gender"
                                value={this.state.gender}

                                >
                                    <option defaultValue value="Male">Male</option>
                                    <option value="Female">Female</option>
                                </Form.Control>
                            </Form.Group>

                            {/*HLA: string*/}
                            <Form.Group controlId="exampleForm.ControlTextarea1">
                                <Form.Label>HLA</Form.Label>
                                <Form.Control
                                type="text"
                                placeholder="HLA"
                                name="HLA"
                                onChange={this.onChangeHandler}
                                value={this.state.HLA}
                                required
                                />
                                 <Form.Text className="text-muted">
                                HLA is a string of length 8
                                </Form.Text>
                            </Form.Group>
                            {/* blood group */}
                            <Form.Group controlId="exampleForm.ControlSelect2">
                                <Form.Label>Blood Group</Form.Label>
                                <Form.Control
                                as="select"
                                onChange={this.onChangeHandler}
                                name="ABO"
                                value={this.state.ABO}
                                >
                                    <option defaultValue>select blood group</option>
                                    <option value="O+">0+</option>
                                    <option  value="O-">0-</option>
                                    <option  value="A+">A+</option>
                                    <option  value="A-">A-</option>
                                    <option  value="B+">B+</option>
                                    <option  value="B-">B-</option>
                                    <option  value="AB+">AB+</option>
                                    <option  value="AB-">AB-</option>
                                </Form.Control>
                            </Form.Group>
                            {/* organ */}
                            <Form.Group>
                                <Form.Label>Organ</Form.Label>
                                <Form.Control
                                as="select"
                                onChange={this.onChangeHandler}
                                name="organ"
                                value={this.state.organ}
                                >
                                    <option defaultValue>select organ</option>
                                    <option value="Eyes">Eyes</option>
                                    <option value="Lungs">Lungs</option>
                                    <option value="Kidney">Kidney</option>
                                    <option value="Liver">Liver</option>
                                    <option value="Bone Marrow">Bone Marrow</option>
                                    <option value="Heart">heart</option>
                                </Form.Control>

                            </Form.Group>
                            {/* address component */}
                            <Address
                                onChange={this.onChangeHandler}
                                add={{
                                    House_No:this.state.House_No,
                                    Street:this.state.Street,
                                    City:this.state.City
                                }}
                                />
                            <Form.Group>
                                <Form.Label>Hospital</Form.Label>
                                <Form.Control
                                as="select"
                                onChange={this.onChangeHandler}
                                name="Hospital"
                                value={this.state.Hospital}
                                >

                                    <option defaultValue>Select nearby Hospital</option>
                                    <option value="Manu Hospital">Manu Hospital</option>
                                    <option value="Manipal Hospital">Manipal Hospital</option>
                                    <option value="Appolo Hospital">Appolo Hospital</option>
                                    <option value="BLK Hospital">BLK Hospital </option>
                                </Form.Control>
                            </Form.Group>
                            <Button variant="primary" type="submit">
                               {bttName}
                            </Button>
                         </Form>
                    </Col>

                </Row>
            </Container>

        );
    }
}

export default DRForm;
