  
import React, { useState, useEffect } from "react";
import {
  FormControl,
  MenuItem,
  Select,
  Card,
  CardContent,
} from "@material-ui/core";
import "./Tracker.css";
import InfoBox from "./InfoBox.js";
import Map from "./Map";
import Table from "./Table";
import LineGraph from "./LineGraph";
import { sortData, prettyPrintStat } from "./util";
import "leaflet/dist/leaflet.css";
import {useDispatch} from "react-redux"
import {useSelector} from "react-redux"
import {RedClicked, GreenClicked, BlackClicked } from "./features/colorSlice"; //selectors

import {redHoveredOn, greenHoveredOn, pinkHoveredOn}
from "./features/colorSlice"; //reducers- states manipulators with dispatch

function Tracker() {
  const [countries, setCountries] = useState([]);
  const [country, setInputCountry] = useState("worldwide");
  const [countryInfo, setCountryInfo] = useState({});
  const [tableData, setTableData] = useState([]);
  const [mapCenter, setMapCenter] = useState({ lat: 34.80746, lng: -40.4796 });
  const [mapZoom, setMapZoom] = useState(3);
  const [mapCountries, setMapCountries] = useState([]);
  const [casesType, setCasesType] = useState("cases");

  const greenClickedOn = useSelector(GreenClicked);
    const redClickedOn = useSelector(RedClicked);
    const blackClickedOn = useSelector(BlackClicked);

    const dispatch = useDispatch();


  useEffect(() => {
    fetch("https://disease.sh/v3/covid-19/all")
      .then((response) => response.json())
      .then((data) => {
        setCountryInfo(data);
      });
  }, []);

  useEffect(() => {
    const getCountriesData = async () => {
      await fetch("https://disease.sh/v3/covid-19/countries")
        .then((response) => response.json())
        .then((data) => {
          const countries = data.map((country) => ({
            name: country.country,
            value: country.countryInfo.iso2,
          }));

          let sortedData = sortData(data);
          setTableData(sortedData);
          setMapCountries(data);
          setCountries(countries);
        });
    };
    getCountriesData();
  }, []);

  const onCountryChange = async (event) => {
    const countryCode = event.target.value;

    const url =
      countryCode === "worldwide"
        ? `https://disease.sh/v3/covid-19/all`
        : `https://disease.sh/v3/covid-19/countries/${countryCode}`;

    await fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setInputCountry(countryCode);
        setMapCenter([data.countryInfo.lat, data.countryInfo.long]);
        setMapZoom(4);
        setCountryInfo(data);
      });
  };

  return (
    <div className="Tracker">
      <div className="left__container">
        <div className="info__container">
          <InfoBox
            isRed
            active={casesType === "cases"}
            onClick={()=> dispatch(redHoveredOn())} 
            onClick={(e) => setCasesType("cases") }
            title="Corona Virus Cases (Today)"
            cases={prettyPrintStat(countryInfo.todayCases)}
            total={prettyPrintStat(countryInfo.cases)}
          />
          <InfoBox
            isGreen
            active={casesType === "recovered"}
            onClick={(e) => setCasesType("recovered")}
            title="Recovered Cases (Today)"
            cases={prettyPrintStat(countryInfo.todayRecovered)}
            total={prettyPrintStat(countryInfo.recovered)}
          />
          <InfoBox
            isBlack
            active={casesType === "deaths"}
            onClick={(e) => setCasesType("deaths")}
            title="Death Cases (Today)"
            cases={prettyPrintStat(countryInfo.todayDeaths)}
            total={prettyPrintStat(countryInfo.deaths)}
          />
        </div>
        <Map
          countries={mapCountries}
          casesType={casesType}
          center={mapCenter}
          zoom={mapZoom}
        />
      </div>
      <div className="right__container">
        <div className="form">
          <FormControl className="form__dropdown">
            <Select
              variant="outlined"
              value={country}
              onChange={onCountryChange}
            >
              <MenuItem value="worldwide">WorldWide</MenuItem>

              {countries.map((country) => (
                <MenuItem value={country.value}>{country.name}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
        <br />
        <Card className="app__right">
        <CardContent>
          <div className="card">
            <h3>Live Cases by Country</h3>
            <Table countries={tableData} />
            <h3>Worldwide new {casesType}</h3>
            <LineGraph casesType={casesType} />
          </div>
        </CardContent>
      </Card>
      </div>
    </div>
  );
}

export default Tracker;