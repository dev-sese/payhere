import "primereact/resources/themes/bootstrap4-light-purple/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import { Link } from "react-router-dom";
import Router from "routes/router";

import "./App.css";

function App() {
  return (
    <div className="App">
      <h1>페이히어 프론트엔드 엔지니어 과제</h1>
      <div></div>
      <li>
        <Link to="search">repo 검색</Link>
      </li>
      <li>
        <Link to="list">repo 목록</Link>
      </li>
      <Router></Router>
    </div>
  );
}

export default App;
