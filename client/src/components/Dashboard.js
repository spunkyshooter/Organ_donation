import React ,{Component}from "react";
import Axios from "axios";
import DashboardTable from "./Table"
import {Button} from "react-bootstrap";


let title = "All Recipients";
class Dashboard extends Component{
    constructor(props){
        super(props);
        this.state = {}
    }

    componentDidMount(){
        let url = "http://localhost:3002/api/receive/recipients"
            Axios.get(url)
            .then(res =>{   
                //since we are getting array and array has organCode. 
                //now we need organName
                // res.data = res.data.map(item => {
                //     item["organ"] = codes[item.OrganCode]
                //     return item;
                // });
                this.setState({data:res.data})
                // console.log("data...")
                // console.log(this.state.data)

            })
            .catch(err => console.log(err))
        // let = urll = "http://localhost:3002/api/donate/donors"
        // Axios.get(urll)
        // .then(res => {
            
        // })

    }
    donorBtnHandler = ()=>{
        title = "All Donors"
        let url = "http://localhost:3002/api/donate/donors"
        Axios.get(url)
        .then(res =>{   

            this.setState({data:res.data})
            // console.log("data...")
            // console.log(res.data)

        })
        .catch(err => console.log(err))
    }
    recipientBtnHandler = () =>{
        title = "All Recipients"
        let url = "http://localhost:3002/api/receive/recipients"
        Axios.get(url)
        .then(res =>{   
            //since we are getting array and array has organCode. 
            //now we need organName
            // res.data = res.data.map(item => {
            //     item["organ"] = codes[item.OrganCode]
            //     return item;
            // });
            this.setState({data:res.data})
            console.log("data...")
            console.log(this.state.data)

        })
        .catch(err => console.log(err))
    }
    render(){
        
        return (
            <div>
                
                <DashboardTable data={this.state.data} title={title}>
                    {
                    title === "All Recipients"?
                    <Button variant="outline-secondary" style={{float:"left"}} onClick={this.donorBtnHandler}>Show Donors</Button>
                    :<Button variant="outline-primary" style={{float:"left"}} onClick={this.recipientBtnHandler}>Show recipients</Button>
                    }
                    </DashboardTable>
            </div>
        )
    }
}

export default Dashboard;