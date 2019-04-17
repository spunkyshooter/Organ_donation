import React, {Component} from "react"
import {Table} from "react-bootstrap"
import CleverButton from "./Cleverbutton"
import Axios from 'axios'

class DashboardTable extends Component{
   constructor(props){
       super(props);
       this.state={
          data:this.props.data
       }
   }
   /* when deleted state should be updated, so setState in  componentDidUpdate() function*/
   componentDidUpdate(prevProps) {
    // Typical usage (don't forget to compare props):
    if (this.props.data !== prevProps.data) {
      this.setState({data : this.props.data })
    }
  }
  
  DeleteHandler =(RID) =>{
    console.log("printing DID from Table"+ this.props.DID);
    let url = `http://localhost:3002/api/receive/delete/${RID}`;
   Axios.delete(url)
   .then(result => console.log(result))
   .catch(err => console.log(err))
   this.setState((prevState) =>(
    {data : prevState.data.filter(item => item.RID !== RID)}
   ))
}
  render(){
    //   console.log(this.state.data)
    let rows = this.state.data && this.state.data.map((donor,i) => (
        <tr key={i}>

                <td>{i+1}</td>
                <td>{donor.Name}</td>
                <td>{donor.sex}</td>
                <td>{donor.ABO}</td>
                <td>{donor.HLA}</td>
                <td>{donor.House_No}</td>
                <td>{donor.Street}</td>
                <td>{donor.city}</td>
                <td><CleverButton data={donor} DHandler={() => this.DeleteHandler(this.state.data[i].RID)}/></td>
        </tr>
    ))
    return (
        <div>

           <h1>All Recipients</h1>

            <Table striped bordered hover >
                <thead>
                    <tr>
                    <th>Sl.No</th>
                    <th>Name</th>
                    <th>Sex</th>
                    <th>ABO</th>
                    <th>HLA</th>
                    <th>House_No</th>
                    <th>Street</th>
                    <th>City</th>
                    <th>Modify</th>
                    </tr>
                </thead>
                <tbody>
                    {rows}
                </tbody>
            </Table>
            
        </div>
    )
  }
}


    

export default DashboardTable;
