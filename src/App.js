import { Button } from "react-bootstrap";
import { Link, Route, Routes } from "react-router-dom";
import "./App.css";
import FetchApi from "./components/FetchApi";
import WishList from "./components/WishList";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Link to={"/"}>
          <Button style={{ position: "absolute", top: "10px", right: "170px" }}>
            Home🏠
          </Button>
        </Link>
        <Link to={"/wish-list"}>
          <Button style={{ position: "absolute", top: "10px", right: "50px" }}>
            Wishlist❤️
          </Button>
        </Link>
        <Routes>
          <Route path="/" element={<FetchApi />} />
          <Route path="/wish-list" element={<WishList />} />
        </Routes>
      </header>
    </div>
  );
}

export default App;
