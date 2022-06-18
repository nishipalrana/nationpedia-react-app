import React from "react";
import { Button, Card, Container } from "react-bootstrap";

export default function AboutUs() {
  return (
    <Container className="marginTop-about-us">
      <Card>
        <Card.Header>About Us</Card.Header>
        <Card.Body className="center">
          <p>
            The application uses the Rest Countries API.
            <br />
            For more information click{" "}
            <Card.Link
              href="https://restcountries.com/"
              target="blank"
              rel="noopener noreferrer"
            >
              here
            </Card.Link>
            .
          </p>
          <p>
            To check the project's GitHub Repository,
            <br />
            click{" "}
            <Card.Link
              href="https://github.com/nishipalrana/nationpedia-react-app"
              target="blank"
              rel="noopener noreferrer"
            >
              here.
            </Card.Link>
          </p>
        </Card.Body>
        <Card.Footer>
          <Button variant="warning" className="goBackBtn" href="/">
            Go Back
          </Button>
        </Card.Footer>
      </Card>
    </Container>
  );
}
