import React,{Component} from "react";
import {Button,Modal,Row,Col} from "react-bootstrap";
import DRForm from "./DRForm"
import Axios from "axios";
//to get the organ Name which is to be sent to edit form
let codes = { 111:"Eyes",222:"Lungs",333:"Kidney",444:"Liver",555:"Bone Marrow",666:"Heart"}
class CleverButton extends Component{
    constructor(props, context) {
        super(props, context);
    
        this.state = {
          smShow: false,
          lgShow: false,
          data: {
            

          }
        };
      }

    componentDidMount(){
        this.setState(
            {data:{
            RID: this.props.data.RID,
            fName : this.props.data.Name,
            gender: this.props.data.sex,
            organ: codes[this.props.data.OrganCode],
            ABO: this.props.data.ABO,   
            Hospital: this.props.data.Hospital,
            HLA:this.props.data.HLA,
            Street:this.props.data.Street,
            City:this.props.data.city,
            House_No:this.props.data.House_No
            }
        })
    }
    componentDidUpdate(prevProps) {
        // Typical usage (don't forget to compare props):
        if (this.props.data !== prevProps.data) {
          this.setState({data : {
            RID: this.props.data.RID,
            fName : this.props.data.Name,
            gender: this.props.data.sex,
            organ: codes[this.props.data.OrganCode],
            ABO: this.props.data.ABO,   
            Hospital: this.props.data.Hospital,
            HLA:this.props.data.HLA,
            Street:this.props.data.Street,
            City:this.props.data.city,
            House_No:this.props.data.House_No
            } })
        }
      }
    searchMatchingDonor = () =>{
        let url = "http://localhost:3002/api/receive/match"
        let params = {
            ABO:this.state.data.ABO,
            HLA:this.state.data.HLA,
            organName:this.state.data.organ
        }
        // console.log("seacrhing method...")
        // console.log(params)
        Axios.get(url,{params})
        .then(rows=>{
                this.setState({matchedDonor:rows.data})
                // console.log(rows.data)
        })
        .catch(err => console.log(err));
    }
    render(){
        // console.log(this.state.matchedDonor && this.state.matchedDonor)
        let matchedDonors = this.state.matchedDonor && 
            this.state.matchedDonor.map((donor,i)=>(
            <Row key={i}>
                <Col>{donor.DonorName}</Col>    
                <Col>{donor.HospitalName} </Col>
            </Row>
        ))
        if(Object(this.state.matchedDonor).length === 0){
            matchedDonors = "no Donors Found"
        }
        let tit = typeof matchedDonors === "string"?
        "":
        <div>
        <h5>{matchedDonors && Object.keys(matchedDonors).length + " Donors Found"}</h5>
        <Row>
            <Col><h6>Donor Name</h6></Col>
            <Col><h6>Hospital Name</h6></Col>
        </Row>
        </div>
        let lgClose = () => this.setState({ lgShow: false });
        let smClose = () => this.setState({ smShow: false });

    return(
            <div >
            <Row>
                <Col>
                    <Button 
                    variant="outline-warning"                    
                    onClick={() => this.setState({ lgShow: true })}
                    >Edit</Button>
                </Col>
                <Col >      
                    <Button 
                    // style={{marginLeft:7}}
                    variant="outline-danger" 
                    onClick={this.props.DHandler}
                    >Delete</Button>
                </Col>
                <Col >
                <Button
                        variant="outline-success"
                        // style={{marginLeft:7}}
                        onClick={()=>{
                            this.setState({smShow:true})
                            this.searchMatchingDonor()
                        }}
                    >
                    Match
                    </Button>
                </Col>
               

            </Row>
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
                <Modal
                    size="sm"
                    show={this.state.smShow}
                    onHide={smClose}
                    aria-labelledby="example-modal-sizes-title-sm"
                >
                    <Modal.Header closeButton>
                        <Modal.Title id="example-modal-sizes-title-sm">
                            Results
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {
                        this.state.matchedDonor && 
                        <div>
                        {tit}
                        {matchedDonors}
                        </div>
                        }
                    </Modal.Body>
                </Modal>
            </div>
        )
    }
}

export default CleverButton;

