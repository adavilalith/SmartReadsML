import React,{useEffect, useState} from 'react'
import MainNavbar from '../components/Navbar'
import { Container,Row,Col,Form,Button } from 'react-bootstrap'
import ReccomendationBookCard from '../components/ReccomendationBookCard'
import axios from 'axios'
import websiteBannerTest from './homepage-bookstore-2022.jpg'
import './Home.css'
import {api_address} from '../config/pythonAPI.js'


export default function Home() {
  const [BookNames,setBookNames] = useState([])//for search feature
  const [data,setData]=useState({status:1,books:[]})
  let flag=0;
  const [BookName,setBookName]=useState("")//for reccomended books
  const fetchReccomendations = async (e,name)=>{
    e.preventDefault();

    let config = {
       method:'post',            
       maxBodyLength: Infinity,
       url: api_address+'/reccomendations_api',
       headers:{ 
        'Content-Type': 'application/json'
       },
       data: {name:name}, 
    };

    const res = await axios.request(config)
    
    setData(res.data)
    setBookName("")
  }
  const fetchBookNames = async ()=>{
      let config = {
        method : 'get',       
        maxBodyLength: Infinity,
        url : api_address+'/book_names',
        header:{}
      };

      const res = await axios.request(config);
      console.log(res)
      setBookNames(res.data.BookNames)    

  }
  
  useEffect(()=>{
    fetchBookNames()
    return ()=>{}
  },[])
  
  const NoBooksHandler=()=>{
    if(data.status==1 && data.books.length==0){
      return(
        <Row className='my-5 mb-5 text-center '>
          <h2>Enter a Book name to get Machine Learning powered book reccomendation. </h2>
        </Row>
      )
    }
    if (data.status==0){
    return (
        <Row className='d-flex text-center my-5'>
          <p className='h3'>No Books with that name exsists <br /> <br />Try another Book Name</p>
        </Row>
      )
    }
    else{
      return(
      <h1>Reccomendations:</h1>
      )
    }
  }


  return (
    <>
    <MainNavbar/>
    <div className='hero'>
      <div className='herotext'>
        <h1 id="title"><strong>How SmartReadsML works</strong></h1>
        <ul>
          <li>
            <h3 className='points'>Takes user input using React.js for frontend</h3>
          </li>
          <li>
            <h3 className="points">A Python Flask server runs hosts the ML model</h3>
          </li>
          <li>
            <h3 className="points">ML model used a dataset of users,books,ratings</h3>
          </li>
          <li>
            <h3 className="points">The model is a content-based recommendation system  </h3>
          </li>
          <li>
            <h3 className="points">It uses cosine similarity scores of the books for reccomendations</h3>
          </li>

        </ul>
      </div>
      <img src={websiteBannerTest} className='heroimg'></img>
    </div>
    <Container>
      <Row className='mt-5'>
        <Col xs={0} sm={0}></Col>
        <Col xs={8} sm={8} lg={6} xl={6}>
        <form onSubmit={(e)=>fetchReccomendations(e)}>
        <div className='dropdown' style={{border:'solid',borderWidth:'0.1rem',borderRadius:'6px'}} >
            
            <input
              type="text"
              placeholder=" enter a book name"
              className="me-2"
              aria-label="Search"
              value={BookName}
              onChange={(e)=>setBookName(e.target.value)}
              style={{width:'100%',borderRadius:'5px',boxShadow:'none'}}
              onSubmit={fetchReccomendations}
            />
          {BookNames.filter((name)=>{
            if(BookName.length==0){
              return false
            }
            for(let i=0;i<BookName.length;i++){
              if(i>=name.length){
                return false;
              }
              if(BookName[i].toLowerCase()!=name[i].toLowerCase()){
                return false;
              }
            }
            return true;

          }).map((name)=>{
            return (
              <p onClick={(e)=>{
                setBookName(name);
                fetchReccomendations(e,name)  
              }}
              > 
                {name}
              </p>
            )
          })}
          </div>
          </form>
        </Col>
        <Col >
        <Button variant="outline-success" onClick={(e)=>fetchReccomendations(e,BookName)}>Search</Button>
        </Col>
        <Col xs={0} sm={0}></Col>
      </Row>
      {NoBooksHandler()}

      <Row>
        <ReccomendationBookCard Books={data.books}></ReccomendationBookCard>
      </Row>
    </Container>
    </>
  )
}
