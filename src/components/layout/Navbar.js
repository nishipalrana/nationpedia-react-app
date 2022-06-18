import React from "react";
import { Navbar, Container, Nav } from "react-bootstrap";
import logo from "../../assets/appLogo.png";
function NavBar() {
  return (
    <>
      <Navbar bg="warning" variant="light">
        <Container>
          <Navbar.Brand href="/">
            <img
              src={logo}
              width="30"
              height="30"
              className="d-inline-block align-top"
              alt="Nationpedia"
            />
            <b> Nationpedia</b>
          </Navbar.Brand>

          <Nav className="me-right">
            <Nav.Link href="/aboutus" style={{ fontWeight: "bold" }}>
              About Us
            </Nav.Link>
            <Nav.Link href="/" style={{ fontWeight: "bold" }}>
              Home
            </Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
}

export default NavBar;
