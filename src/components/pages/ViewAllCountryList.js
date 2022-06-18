import React, { useEffect, useState } from "react";
import { service as NationPediaService } from "../../services/NationpediaService";
import { Card, Spinner, Row, Col, Alert } from "react-bootstrap";

export default function ViewAllCountryList() {
  const [countryList, setCountryList] = useState([]);
  const [loadingData, setLoadingData] = useState(true);
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    init();
  });

  const init = async () => {
    if (countryList.length === 0) {
      await NationPediaService.getCountriesList().then(
        //success callback
        (response) => {
          setCountryList(response.data);
          setLoadingData(false);
        }, //failure callback
        function () {
          setShowAlert(true);
          setLoadingData(false);
        }
      );
    }
  };

  return (
    <div className="container-list">
      <Row xl={4} xxl={4} md={2} lg={2} sm={1} xs={1}>
        {countryList.length > 0 &&
          countryList.map((country) => (
            <Col key={country.name.common}>
              <Card>
                <Card.Img src={country.flags.png}></Card.Img>
                <Card.Header>
                  <b>{country.name.common}</b>
                  <p>Capital : {country.capital ?? "Unknown"}</p>
                  <p>
                    <Card.Link href={`/viewCountryInfo/${country.name.common}`}>
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
        <Alert variant="danger" onClose={() => setShowAlert(false)} dismissible>
          Error! Failed to load the data.{" "}
          <Alert.Link href="/">Click here</Alert.Link> to go back.
        </Alert>
      )}
    </div>
  );
}
