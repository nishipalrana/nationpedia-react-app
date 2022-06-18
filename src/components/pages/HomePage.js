import React, { useEffect, useState } from "react";
import { Card, Container, Button, Row, Col } from "react-bootstrap";
import { service } from "../../services/NationpediaService";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMagnifyingGlass,
  faCircleArrowRight,
} from "@fortawesome/free-solid-svg-icons";
import worldMap from "../../assets/worldMap.png";

export default function HomePage() {
  const [countryList, setList] = useState([]);
  const [country, setCountry] = useState("");

  const init = async () => {
    console.log("Fetching Country List from Database");
    await service.getCountryNameList().then((response) => {
      const countryList = response.data.map((country) => country.name.common);
      setList(countryList);
    });
  };

  useEffect(() => {
    init();
  }, []);

  return (
    <>
      {countryList.length > 0 && (
        <div className="countryDropdown">
          <input
            list="country"
            autoComplete="on"
            onSelect={(e) => {
              e.preventDefault();
              setCountry(e.target.value);
              console.log("country " + country);
              console.log("e value " + e.target.value);
            }}
            placeholder="Select a Country"
          ></input>
          <datalist id="country">
            {countryList.map((country) => (
              <option value={country} key={country}></option>
            ))}
          </datalist>

          <Button
            variant="warning"
            disabled={country === ""}
            className="dropDownButton"
            href={`/viewCountryInfo/${country}`}
          >
            <FontAwesomeIcon icon={faMagnifyingGlass} />
          </Button>
        </div>
      )}

      {
        <Container className="marginTop">
          <Row xl={3} xxl={3} md={2} lg={2} sm={1} xs={1}>
            <Col>
              <Card className="homePageCard">
                <Card.Img src={worldMap} className="homePageCardImg"></Card.Img>
                <Card.Header>
                  View All Countries
                  <Button
                    className="homePageBtn"
                    variant="warning"
                    href="/AllCountries"
                  >
                    <FontAwesomeIcon icon={faCircleArrowRight} />
                  </Button>
                </Card.Header>
              </Card>
            </Col>
            <Col>
              <Card className="homePageCard">
                <Card.Img src={worldMap} className="homePageCardImg"></Card.Img>
                <Card.Header>
                  View All Countries By Region
                  <Button
                    className="homePageBtn"
                    variant="warning"
                    href="/CountriesByRegion"
                  >
                    <FontAwesomeIcon icon={faCircleArrowRight} />
                  </Button>
                </Card.Header>
              </Card>
            </Col>
            <Col>
              <Card className="homePageCard">
                <Card.Img src={worldMap} className="homePageCardImg"></Card.Img>
                <Card.Header>
                  View Countries By Currency
                  <Button
                    className="homePageBtn"
                    variant="warning"
                    href="/ViewCountriesByCurrency"
                  >
                    <FontAwesomeIcon icon={faCircleArrowRight} />
                  </Button>
                </Card.Header>
              </Card>
            </Col>
          </Row>
        </Container>
      }
    </>
  );
}
