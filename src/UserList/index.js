import React, { Component } from "react";
import axios from 'axios';
import PaginationComponent from "./PaginationComponent";
import { Container, Row, Col } from 'react-bootstrap';

class UserList extends Component {
    state = {
        data: [],
        totalRecords:0,
        limit: 6
    }
    componentDidMount(){
        this.loadData(1);
    }
    loadData = (page) =>{
        console.log('page>>',page)
        axios
            .get(`https://reqres.in/api/users?page=`+page)
            .then(res => {

                const data = res.data;
                console.log('data',data)
                this.setState({
                    data: data.data,
                    totalRecords : data.total ? data.total : 0,
                    limit : data.per_page ? data.per_page : 6
                })
            });
    }
    getPaginatedData = page =>{
        this.loadData(page);
    }
    render(){
        const { data, totalRecords, limit } = this.state;
        return(
            <Container>
            <Row>
            {
              data && data.length > 0 ?
              data.map((item,index)=>(
 <Col xs="6" sm="4">
 <Container>

 <div>
   <span> {item.id}</span>
  <img alt="User" style={{height:100,borderRadius:50,width:100}} src={item.avatar}></img></div>
   <div > <span>{item.first_name} - {item.last_name}</span></div>
    <span>{item.email}</span></Container>
    </Col>
        )) :
                <h4>No Data Found!!</h4>
                 }
            </Row>
            
              <div>
                {totalRecords > 6 &&
                    <PaginationComponent
                        getAllData={this.getPaginatedData} 
                        totalRecords={totalRecords}
                        itemsCountPerPage = {limit} />
                }
                </div>
            </Container>
        );
    }
}

export default UserList;
