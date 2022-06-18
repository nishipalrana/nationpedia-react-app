import React, { useState } from "react";
import { Grid } from "@material-ui/core";
import { Card, Spinner, Row, Col, Alert, Button } from "react-bootstrap";
import { service } from "../../services/NationpediaService";

export default function ViewCountriesByRegion() {
  const [countryListByRegion, setCountriesByRegion] = useState([]);
  const [loadingData, setLoadingData] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  const handleClick = (region) => {
    setLoadingData(true);
    console.log("Fetching Country List By Region from API");
    console.log(`Region: ${region}`);
    service.getCountriesByRegion(region).then(
      //success callback
      (response) => {
        const countryList = response.data;
        setCountriesByRegion(countryList);
        setLoadingData(false);
      }, //failure callback
      function () {
        setShowAlert(true);
        setLoadingData(false);
      }
    );
  };

  return (
    <div className="list-item-country">
      <Grid
        container
        spacing={2}
        direction="row"
        justifyContent="space-evenly"
        margin={30}
      >
        <Grid item>
          <Button
            variant="warning"
            onClick={(event) => handleClick("africa", event)}
          >
            <b>Africa</b>
          </Button>
        </Grid>
        <Grid item>
          <Button
            variant="warning"
            onClick={(event) => handleClick("americas", event)}
          >
            <b>America</b>
          </Button>
        </Grid>
        <Grid item>
          <Button
            variant="warning"
            onClick={(event) => handleClick("asia", event)}
          >
            <b>Asia</b>
          </Button>
        </Grid>
        <Grid item>
          <Button
            variant="warning"
            onClick={(event) => handleClick("europe", event)}
          >
            <b>Europe</b>
          </Button>
        </Grid>
        <Grid item>
          <Button
            variant="warning"
            onClick={(event) => handleClick("oceania", event)}
          >
            <b>Oceania</b>
          </Button>
        </Grid>
      </Grid>

      <div className="container-list">
        <Row xl={4} xxl={4} md={2} lg={2} sm={1} xs={1}>
          {countryListByRegion.length > 0 &&
            countryListByRegion.map((country) => (
              <Col key={country.name.common}>
                <Card>
                  <Card.Img src={country.flags.png}></Card.Img>
                  <Card.Header>
                    <b>{country.name.common}</b>
                    <p>Capital : {country.capital ?? "Unknown"}</p>
                    <p>
                      <Card.Link
                        href={`/viewCountryInfo/${country.name.common}`}
                      >
                        Learn More
                      </Card.Link>
                    </p>
                  </Card.Header>
                </Card>
              </Col>
            ))}
        </Row>

        {loadingData && (
          <div className="spinner">
            <Spinner animation="border" variant="warning" role="status">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          </div>
        )}
        {showAlert && (
          <Alert
            variant="danger"
            onClose={() => setShowAlert(false)}
            dismissible
          >
            Error! Failed to load the data.{" "}
            <Alert.Link href="/">Click here</Alert.Link> to go back.
          </Alert>
        )}
      </div>
    </div>
  );
}
