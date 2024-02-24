import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Card.css";

import backImage from "./../../assets/back.svg";

const Card = () => {
  const [country, setCountry] = useState({});
  const { common } = useParams();

  useEffect(() => {
    axios
      .get("https://restcountries.com/v3.1/name/" + common)
      .then((res) => setCountry(res.data[0]))
      .catch((error) => console.error(error));
  }, [common]);

  const navigate = useNavigate();

  return (
    <div>
      <header>
        <h2>Where in the world?</h2>
        <p>Dark Mode</p>
      </header>
      <main style={{ color: "white" }} className="cardMain">
        <div className="boxx">
          <button onClick={() => navigate("/")}>
            {" "}
            <img src={backImage} style={{width: 20, height: 20}}/>
            Back
          </button>
          <img src={country?.flags?.svg} alt="png" />
          <div className="content">
            <h2>{country?.name?.common}</h2>
            <p>
              Population: <span>{country?.population}</span>
            </p>
            <p>
              Region: <span>{country?.region}</span>
            </p>
            <p>
              Continents: <span>{country?.continents}</span>
            </p>
            <p>
              Timezone: <span>{country?.timezones}</span>
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Card;
