import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link }from 'react-router-dom'
function MainNavbar() {
  return (
    <Navbar expand="lg" className="bg-light">
      <Container fluid>
        <Navbar.Brand href="#"><strong>Book Reccomendation System</strong></Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
            <Nav.Link href="#action1">
              <Link to='/' style={{textDecoration:'none',color:'black'}}>Home</Link>
            </Nav.Link>
            <Nav.Link href="#action2">
              <Link to='/Top50' style={{textDecoration:'none',color:'black'}}>Top50</Link>
            </Nav.Link>
            <Nav.Link href="#action2">Classics</Nav.Link>
            <Nav.Link href="#action2">Souce Code</Nav.Link>
            <Nav.Link href="#action2">Let's Connect!</Nav.Link>

        </Nav>
          <Form className="d-flex">
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
            />
            <Button variant="outline-success">Search</Button>
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default MainNavbar;