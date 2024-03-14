import React,{useState} from 'react'
import MainNavbar from '../components/Navbar'
import { Container,Row,Col,Form,Button } from 'react-bootstrap'
import ReccomendationBookCard from '../components/ReccomendationBookCard'
import axios from 'axios'

export default function Home() {
  const [data,setData]=useState({status:1,books:[]})
  let flag=0;
  const [BookName,setBookName]=useState("")
  const fetchReccomendations = async ()=>{
    
    let config = {
       method:'post',            
       maxBodyLength: Infinity,
       url:'http://127.0.0.1:5000/reccomendations_api',
       headers:{ 
        'Content-Type': 'application/json'
       },
       data: {name:BookName}, 
    };

    const res = await axios.request(config)
  
    setData(res.data)
  }
  const NoBooksHandler=()=>{
    if (data.status==0){
    return (
        <Row className='d-flex text-center my-5'>
          <p className='h3'>No Books with that name exsists <br /> <br />Try another Book Name</p>
        </Row>
      )
    }
  }


  return (
    <>
    <MainNavbar/>
    <Container>
      <Row className='mt-5'>
        <Col></Col>
        <Col>
        <Form className="d-flex">
            <Form.Control
              type="search"
              placeholder="enter a book name"
              className="me-2"
              aria-label="Search"
              onChange={(e)=>setBookName(e.target.value)}
            />
            <Button variant="outline-success" onClick={fetchReccomendations}>Search</Button>
          </Form>
        </Col>
        <Col></Col>
      </Row>
      {NoBooksHandler()}
      <Row>
        <ReccomendationBookCard Books={data.books}></ReccomendationBookCard>
      </Row>
    </Container>
    </>
  )
}
