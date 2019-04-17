import React ,{Component}from "react";
import Axios from "axios";
import DashboardTable from "./Table"

//to get the organ Name which is to be sent to edit form
let codes = { 111:"Eyes",222:"Lungs",333:"Kidney",444:"Liver",555:"Bone Marrow",666:"Heart"}

class Dashboard extends Component{
    constructor(props){
        super(props);
        this.state = {}
    }

    componentDidMount(){
        let url = "http://localhost:3002/api/receive/recipients"
            Axios.get(url)
            .then(res =>{   
                //since we are getting array
                res.data = res.data.map(item => {
                    item["organ"] = codes[item.OrganCode]
                    return item;
                });
                this.setState({data:res.data})
                console.log("data...")
                console.log(this.state.data)

            })
            .catch(err => console.log(err))

    }
    render(){
        
        return (<DashboardTable data={this.state.data}/>)
    }
}

export default Dashboard;