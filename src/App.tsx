import { useEffect } from "react";
import { getRepositoriesWithSearch } from "./services/Search.service";
import "./App.css";

function App() {
  useEffect(() => {
    let response = getRepositoriesWithSearch();

    console.log(response);
  }, []);

  return <div className="App">test page</div>;
}

export default App;
