import React from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { useDispatch, useSelector } from "react-redux";
// import { Link } from "react-router-dom";
import { removeFromWishList } from "./ReducerSlice";

const WishList = () => {
  const dispatch = useDispatch();
  const company = useSelector((store) => store.company);
  console.log(company, "USER");

  const handleRemove = (id) => {
    console.log("ID:", id);
    dispatch(removeFromWishList({ id }));
  };
  return (
    <>
      <h1>WishList</h1>
      {company.length ? (
        company.map((val, index) => {
          return (
            <Card
              key={val.id}
              className="m-3 d-flex"
              style={{ width: "25rem", color: "black", flexDirection: "row" }}
            >
              <Card.Body>
                <Card.Title>{val.companyName}</Card.Title>
                <Card.Text>
                  <b>Stock Price: </b>
                  {val.companyStockPrice}
                </Card.Text>
                <Button onClick={() => handleRemove(val.id)} variant="danger">
                  Remove
                </Button>
              </Card.Body>
            </Card>
          );
        })
      ) : (
        <div>No Items...</div>
      )}
    </>
  );
};

export default WishList;
