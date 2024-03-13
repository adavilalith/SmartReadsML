import React from 'react'
import MainNavbar from '../components/Navbar'
import { Container,Row,Col,Form,Button } from 'react-bootstrap'


export default function Home() {
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
            />
            <Button variant="outline-success">Search</Button>
          </Form>
        </Col>
        <Col></Col>
      </Row>
    </Container>
    </>
  )
}
