import React ,{Component}from "react";
import Axios from "axios";
import DashboardTable from "./Table"

class Dashboard extends Component{
    constructor(props){
        super(props);
        this.state = {

        }
    }
    componentDidMount(){
        let url = "http://localhost:3002/api/receive/recipients"
            Axios.get(url)
            .then(res =>{
                this.setState({data:res.data})
                console.log("data...")
                console.log(this.state.data)

            })
            .catch(err => console.log(err))
            // Axios.get(anotherUrl)
            // .then(res => {
            //     this.setState(prevState => ({...prevState,organ:res.data.organCode,}))
            // })
    }
    render(){
        
        return (<DashboardTable data={this.state.data}/>)
    }
}

export default Dashboard;