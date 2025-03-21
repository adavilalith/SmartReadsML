import React,{useEffect, useState} from 'react'
import MainNavbar from '../components/Navbar'
import { Container,Row,Col,Form,Button } from 'react-bootstrap'
import axios from 'axios'
import websiteBannerTest from './homepage-bookstore-2022.jpg'
import './Home.css'
import {api_address} from '../config/pythonAPI.js'
import BookCard from '../components/BookCard'
import {motion} from 'framer-motion'
import Footer from '../components/Footer.js'
import { Card} from 'react-bootstrap'


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
      setBookNames(res.data.BookNames)    

  }
  
  useEffect(()=>{
    fetchBookNames()
    return ()=>{}
  },[])
  
  const NoBooksHandler=()=>{
    if(data.status==1 && data.books.length==0){
      return(
        ""
        // <Row className='my-5 mb-5 text-center '>
        //   <motion.h5 initial={{opacity:0,y:30}} whileInView={{opacity:1,y:0}} transition={{duration:0.5}}>Enter a Book name to get Machine Learning powered book reccomendation. </motion.h5>
        // </Row>
      )
    }
    if (data.status==0){
    return (
        <Row className='d-flex text-center my-5'>
          <p className='h4'>No Books with that name exsists <br /> <br />Try another Book Name</p>
        </Row>
      )
    }
    else{
      return(
        <>
      <h1>Reccomendations:</h1> 
      <br/>
        </>
      )
    }
  }


  return (
    <>
    <MainNavbar/>
    <div className='hero'>
      <motion.div className='herotext' initial={{opacity:0,y:50}} whileInView={{opacity:1,y:0}} transition={{duration:0.5}}>
        <h1 id="title"><strong>Find Your Next Great Read</strong></h1><br/>
        <h4 style={{"color":"grey"}}> 
        Enter a book you love and discover similar titles that you'll enjoy just as much.
        </h4>
      </motion.div>
    </div>
    <div id="search-div">
        <form onSubmit={(e)=>fetchReccomendations(e,BookName)}>
        <div className='dropdown' style={{border:'solid',borderWidth:'0.1rem',borderRadius:'6px'}} >
            
            <input
              type="text"
              placeholder=" enter a book name"
              className="me-2"
              aria-label="Search"
              value={BookName}
              onChange={(e)=>setBookName(e.target.value)}
              style={{width:'100%',borderRadius:'5px',boxShadow:'none'}}
              onSubmit={(e)=>{alert('hi');fetchReccomendations(e,BookName)}}
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
        <Button id="search-btn" variant="outline-success" onClick={(e)=>fetchReccomendations(e,BookName)}>Search</Button>
      <br/>
      </div>
         
          

          <br/>

<Row style={{"padding":"0rem 3rem"}}>
{NoBooksHandler()}

</Row>
      <Row>

        <BookCard Books={data.books}></BookCard>
      </Row>
    <div id="explanation-div">
    <h1><strong>How It Works</strong></h1>
      <h4 style={{"color":"grey","padding":"10px"}}>
      Our recommendation engine analyzes thousands of books to find the perfect match for your reading preferences.
      </h4>
      <ol>
        <li>Enter a book you've enjoyed</li>
        <li>Our algorithm finds similar titles</li>
        <li>Discover your next favorite book</li>
      </ol>
    </div>
    <div id="personal-reccomentations">
      <h1><strong>Currently Reading:</strong><br/></h1>
      <Card className='mx-3 my-3' style={{ width: '18rem' }}>
        <Card.Img variant="top" src={"https://m.media-amazon.com/images/I/515fsT6ty4L._UF1000,1000_QL80_.jpg"} style={{height:'20rem'}}/>
        <Card.Body>

          <Card.Title>{"Shadow Slave"}</Card.Title>
          <Card.Text>
            <p>{"GuiltyThree"}</p>
            <p>{`${Number(9.38).toFixed(2)}/10`}</p>
            <p>{`${4598} ratings`}</p>
          </Card.Text>
        </Card.Body>
      </Card>
    </div>
    <Footer/>
    </>
  )
}
