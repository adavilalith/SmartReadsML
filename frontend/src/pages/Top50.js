import React, { useState, useEffect } from 'react'
import MainNavbar from '../components/Navbar'
import {Container} from 'react-bootstrap'
import BookCard from '../components/BookCard'
import axios from 'axios'

export default function Top50() {
    const [data,setData] = useState([])

    const fetchTop50 = async ()=>{
        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: 'http://127.0.0.1:5000/top50_api',
            headers: { }
            };
    
        const res = await axios.request(config)
        console.log(res.data)
        setData(res.data)
    }

    useEffect(()=>{
      fetchTop50()
      return ()=>{}
    },[])
    
    return (
      <>
        <MainNavbar></MainNavbar>
        <Container>
          <BookCard Books={data} />
        </Container> 
      </>
    )
}
