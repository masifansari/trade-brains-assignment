import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { addToWishList } from "./ReducerSlice";
import { v4 as uuidv4 } from "uuid";
import { useNavigate } from "react-router-dom";
import { ReactSearchAutocomplete } from "react-search-autocomplete";
import items from "./companies";

const FetchApi = () => {
  const [fetchedData, setFetchedData] = useState();
  const [companyStockPrice, setcompanyStockPrice] = useState();
  const [companyName, setcompanyName] = useState("");
  const [timeValue, settimeValue] = useState();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // !============= Fetch API ====================
  const fetchAPI = async () => {
    const data = await fetch(
      `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${companyName}&interval=5min&apikey=1NNB7SAZMD76OYAD`
    );
    let apiData = await data.json();
    if (apiData) {
      setFetchedData(apiData);
      setcompanyName(apiData["Meta Data"]["2. Symbol"]);
    } else {
      alert("No data found!");
      return 0;
    }
    let objData = apiData["Time Series (5min)"];
    for (let i in objData) {
      if (typeof objData[i] === "object") {
        settimeValue(i);
        setcompanyStockPrice(`$${objData[i]["1. open"]}`);
      }
    }
  };
  const handleClick = (event) => {
    if (!companyName) {
      alert("Invalid company name");
    } else {
     
      fetchAPI();
    }
  };

  
  const handleClickAdd = () => {
    console.log(companyName);
    console.log(companyStockPrice);
    dispatch(
      addToWishList({
        id: uuidv4(),
        companyName,
        companyStockPrice,
      })
    );
    navigate("/wish-list");
  };

  console.log(fetchedData, "DATA");
  useEffect(() => {}, []);

  const handleOnSelect = (items) => {
    if (items.name === "") {
      setcompanyStockPrice("");
      setcompanyName("");
    } else {
      setcompanyName(items.name);
    }
  };
  const clearField = () => {
    setcompanyName("");
    setcompanyStockPrice("");
  };
  const formatResult = (item) => {
    return (
      <>
        <span style={{ display: "block", textAlign: "left" }}>
          {item.name}
        </span>
      </>
    );
  };
  return (
    <div>
     
      <div className="mb-1" style={{ width: 400 }}>
        <ReactSearchAutocomplete
          autoFocus
          onHover={handleOnSelect}
          onFocus={handleOnSelect}
          onClear={clearField}
          items={items}
          onSelect={handleOnSelect}
          formatResult={formatResult}
        />
      </div>
      <button onClick={handleClick} className="btn btn-primary pe-4 ps-4">
        Find
      </button>
      <hr />
      <br />
      Company Name: {companyName}
      <br />
      Stock Price: {companyStockPrice}
      <br />
      <button
        onClick={handleClickAdd}
        className="btn btn-warning p-2 ps-3 pe-3"
      >
        Add
      </button>
    </div>
  );
};

export default FetchApi;
