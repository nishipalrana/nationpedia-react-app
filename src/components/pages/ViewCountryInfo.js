import React, { useEffect, useState } from "react";
import { Card, Button, Row, Col, Spinner, Alert } from "react-bootstrap";

import { Link } from "react-router-dom";
import { service } from "../../services/NationpediaService";

export default function ViewCountryInfo({
  match: {
    params: { name },
  },
}) {
  const [countryInfo, setCountryInfo] = useState([]);
  const [loadingData, setLoadingData] = useState(true);
  const [showAlert, setShowAlert] = useState(false);

  const getPopulation = (population) => {
    if (parseInt(population / 1000000) === 0) {
      return population / 1000 + " K";
    } else {
      return population / 1000000 + " million";
    }
  };

  const getCurrencyList = (currencyObj) => {
    let currencyKey = Object.keys(currencyObj || {});
    if (currencyKey !== undefined && currencyKey.length < 2) {
      return `${currencyObj[currencyKey].name} -
        ${currencyObj[currencyKey].symbol}`;
    } else {
      let currencyStr = "";
      currencyKey.forEach((key) => {
        currencyStr += `${currencyObj[key].name} -
        ${currencyObj[key].symbol}, `;
      });
      return currencyStr.substring(0,currencyStr.lastIndexOf(","));
    }
  };

  const getCountryData = async (name) => {
    console.log("Fetching Country Data from API, Country: " + name);
    await service.getCountryInfo(name).then(
      //success callback
      (response) => {
        const countryResponse = response.data;
        setCountryInfo(countryResponse);
        setLoadingData(false);
      }, //failure callback
      function () {
        setShowAlert(true);
        setLoadingData(false);
      }
    );
  };

  useEffect(() => {
    getCountryData(name);
  }, [name]);

  return (
    <>
      <div>
        {countryInfo !== undefined &&
          countryInfo.map((country) => (
            <Card key={country.name.common}>
              <Card.Header className="country-info-card-header">
                Country Info: <b>{country.name.common}</b>
              </Card.Header>
              <Card.Img
                src={country.flags?.png}
                alt={country.name?.common}
                title={country.name?.common}
                className={"countryFlag"}
              />
              <Card.Body className="country-info-card-body">
                <Row>
                  <Col>Area: </Col>
                  <Col>{country.area} sq. kms</Col>
                </Row>

                <Row>
                  <Col>Capital: </Col>
                  <Col>{country.capital}</Col>
                </Row>

                <Row>
                  <Col>Continent: </Col>
                  <Col>{country.continents}</Col>
                </Row>

                <Row>
                  <Col>Currencies: </Col>
                  <Col>{getCurrencyList(country.currencies)}</Col>
                </Row>

                <Row>
                  <Col>Population: </Col>
                  <Col>{getPopulation(country.population)}</Col>
                </Row>

                <Row>
                  <Col>Co-ordinates: </Col>
                  <Col>
                    Lat: {country.latlng[0]}, Lng: {country.latlng[1]}
                  </Col>
                </Row>

                <Row>
                  <Col>Maps: </Col>
                  <Col>
                    <a href={country.maps.googleMaps}>Google Maps</a>,
                    <a href={country.maps.openStreetMaps}> Open Street Maps</a>
                  </Col>
                </Row>

                <Row>
                  <Col>Region: </Col>
                  <Col>{country.region}</Col>
                </Row>

                <Row>
                  <Col>Sub Region: </Col>
                  <Col>{country.subregion}</Col>
                </Row>

                <Row>
                  <Col>Top level Domain: </Col>
                  <Col>{country.tld}</Col>
                </Row>

                <Row>
                  <Col>Timezones: </Col>
                  <Col>{country.timezones}</Col>
                </Row>

                <Row>
                  <Col>Independent: </Col>
                  <Col>{country.independent === true ? "Yes" : "No"}</Col>
                </Row>

                <Row>
                  <Col>Landlocked: </Col>
                  <Col>{country.landlocked === true ? "Yes" : "No"}</Col>
                </Row>

                <Row>
                  <Col>United Nations Member: </Col>
                  <Col>{country.unMember === true ? "Yes" : "No"}</Col>
                </Row>

                <Row>
                  <Col>Car Drviving: </Col>
                  <Col>{country.car?.side === "left" ? "LHD" : "RHD"}</Col>
                </Row>
              </Card.Body>
              <Card.Footer>
                <Link to="/" exact="true" style={{ textDecoration: "none" }}>
                  <Button variant="warning">Go Back</Button>
                </Link>
              </Card.Footer>
            </Card>
          ))}
      </div>
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
    </>
  );
}
