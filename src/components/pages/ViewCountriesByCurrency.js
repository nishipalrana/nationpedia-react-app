import React, { useEffect, useState } from "react";
import { Card, Button, Row, Col, Spinner, Alert } from "react-bootstrap";
import { service } from "../../services/NationpediaService";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

export default function ViewCountriesByCurrency() {
  const [countryListByCurrency, setCountryListByCurrency] = useState([]);
  const [currencyList, setCurrencyList] = useState([]);
  const [loadingData, setLoadingData] = useState(true);
  const [showAlert, setShowAlert] = useState(false);
  const [currency, setCurrency] = useState("");

  const getCurrencyList = () => {
    service.getCurrencyList().then(
      //success fallback
      (response) => {
        const currencyList = response.data;
        const tempArr = currencyList.map((item) => {
          return item.currencies;
        });
        const dropdownList = buildDropdownList(tempArr);
        console.log(dropdownList);
        setCurrencyList(dropdownList);
        setLoadingData(false);
      }, //failure callback
      () => {
        setShowAlert(true);
        setLoadingData(false);
      }
    );
  };
  const buildDropdownList = (arr) => {
    function getUniqueListBy(arr, key) {
      return [...new Map(arr.map((item) => [item[key], item])).values()];
    }

    const dropdownArray = arr
      .map((itemObj) => {
        let key = Object.keys(itemObj)[0];
        let data = itemObj[key];
        return {
          code: key,
          name: data?.name,
          symbol: data?.symbol,
        };
      })
      .filter((item) => {
        return item.code !== undefined;
      });

    return getUniqueListBy(dropdownArray, "code");
  };

  const onClickHandler = () => {
    service.getCountriesByCurrency(currency).then(
      //success callback
      (response) => {
        setCountryListByCurrency(response.data);
        setLoadingData(false);
        setShowAlert(false);
      }, //failure callback
      () => {
        setShowAlert(true);
        setLoadingData(false);
      }
    );
  };

  useEffect(() => {
    getCurrencyList();
  },[]);

  return (
    <>
      {currencyList.length > 0 && (
        <div className="countryDropdown">
          <input
            list="currencies"
            autoComplete="on"
            onSelect={(e) => {
              e.preventDefault();
              setCurrency(e.target.value);
              console.log("Currency " + currency);
              console.log("e value " + e.target.value);
            }}
            placeholder="Select a Currency"
          ></input>
          <datalist id="currencies">
            {currencyList.map((currencyObj, index) => (
              <option value={currencyObj.code} key={currencyObj.name + index}>
                {currencyObj.name} - {currencyObj.symbol}
              </option>
            ))}
          </datalist>

          <Button
            variant="warning"
            disabled={currency === ""}
            className="dropDownButton"
            onClick={onClickHandler}
          >
            <FontAwesomeIcon icon={faMagnifyingGlass} />
          </Button>
        </div>
      )}

      <div className="container-list">
        <Row xl={4} xxl={4} md={2} lg={2} sm={1} xs={1}>
          {countryListByCurrency.length > 0 &&
            countryListByCurrency.map((country) => (
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
    </>
  );
}
