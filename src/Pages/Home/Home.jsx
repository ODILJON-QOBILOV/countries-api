// Home Component
import React, { useState, useEffect } from "react";
import "./Home.css";
import axios from "axios";
import Header from "../../components/Header/Header";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [countries, setCountries] = useState([]);
  const [search, setSearch] = useState("");
  const getCountries = () => {
    axios
      .get("https://restcountries.com/v3.1/all")
      .then(({ data }) => setCountries(data));
  };
  useEffect(() => {
    getCountries();
  }, []);

  const filterData = countries.filter((country) => {
    return country.name.common
      .toLocaleLowerCase()
      .includes(search.toLocaleLowerCase());
  });
  const navigateTo = useNavigate();

  console.log(countries[0]);
  

  return (
    <div>
      <Header />
      <main>
        <div className="searching">
          <input
            type="text"
            placeholder="Search for a country…"
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="boxContainer">
          {filterData.map((item, i) => {
            return (
              <div
                className="itemBox"
                key={i}
                onClick={() => {
                  navigateTo(`/country/${item.name.common}`);
                }}
              >
                <div key={item.flags.png}>
                  <img src={item.flags.png} alt={`${item.name.common} flag`} />
                </div>
                <div className="itemContent">
                  <h2>{item.name.common}</h2>
                  <p key={item.population}>
                    Population: <span>{item.population}</span>
                  </p>
                  <p key={item.region}>
                    Region: <span>{item.region}</span>
                  </p>
                  <p key={item.capital}>
                    Capital: <span>{item.capital}</span>
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </main>
    </div>
  );
};

export default Home;
