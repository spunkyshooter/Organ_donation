import React,{Component} from "react";
import {Button,Modal} from "react-bootstrap";
import DRForm from "./DRForm"

class CleverButton extends Component{
    constructor(props, context) {
        super(props, context);
    
        this.state = {
          lgShow: false,
          data: {
            RID: this.props.data.RID,
            fName : this.props.data.Name,
            gender: this.props.data.sex,
            organ: this.props.data.organ,
            ABO: this.props.data.ABO,
            Hospital: this.props.data.Hospital,
            HLA:this.props.data.HLA,
            Street:this.props.data.Street,
            City:this.props.data.city,
            House_No:this.props.data.House_No

          }
        };
      }
    render(){
        console.log("props data")
        console.log(this.props.data);
        console.log("state")
        console.log(this.state.data);
        let lgClose = () => this.setState({ lgShow: false });
    return(
            <div style={{"width":150}}>
                <Button 
                variant="outline-warning" 
                style={{marginRight:10}}
                onClick={() => this.setState({ lgShow: true })}
                >Edit</Button>
                <Button 
                variant="outline-danger" 
                onClick={this.props.DHandler}
                >Delete</Button>
                <Modal
                    size="lg"
                    show={this.state.lgShow}
                    onHide={lgClose}
                    aria-labelledby="example-modal-sizes-title-lg"
                >
                    <Modal.Header closeButton>
                        <Modal.Title id="example-modal-sizes-title-lg">
                            EDIT INFO
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <DRForm data={this.state.data} btnName="Update"/>
                    </Modal.Body>
                </Modal>
            </div>
        )
    }
}

export default CleverButton;

