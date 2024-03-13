import React ,{useState}from 'react'
import { Container,Card,Button } from 'react-bootstrap'

export default function BookCard({Books}) {
  return (
    <Container className='d-flex flex-wrap mx-5'>

     {Books.map((i,idx)=>{
        return (
            <Card key={idx} className='mx-3 my-3' style={{ width: '15rem' }}>
            <Card.Img variant="top" src={i['Image-URL-M']} style={{height:'70%'}}/>
            <Card.Body>
              <Card.Title>{i['Book-author']}</Card.Title>
              <Card.Text>
                {`Ratings: ${(i['avg_ratings']*1.6).toFixed(1)}`}
              </Card.Text>
              <Button variant="warning"><strong>Buy Now</strong></Button>
            </Card.Body>
          </Card>
        )
     })} 
    </Container>
  )
}
