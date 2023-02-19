import React, { useEffect, useState } from "react";
import { getRepositoriesWithSearch } from "services/Search.service";
import "./App.css";

function App() {
  const [searchInput, setSearchInput] = useState("");

  const [searchParam, setSearchParam] = useState("#");

  const [apiresponse, setApiresponse] = useState<any>([]);

  const searchParamChangeHandler = () => {
    setSearchParam(searchInput);
  };

  useEffect(() => {
    getRepositoriesWithSearch(searchParam)
      .then((response) => {
        setApiresponse(response);
      })
      .catch((error) => {
        throw error;
      });
  }, [searchParam]);

  return (
    <div className="App">
      <h1>페이히어 프론트엔드 엔지니어 과제</h1>
      <div>
        <input
          type={"text"}
          value={searchInput}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setSearchInput(e.target.value);
          }}
        />
        <button onClick={searchParamChangeHandler}>검색</button>
        <div>우히히</div>
        <div>
          {searchInput} {searchParam}
        </div>
        <div>
          {apiresponse.length !== 0 &&
            //
            apiresponse.map((data: any) => {
              return <div key={data.id}>{data["full_name"]}</div>;
            })}
        </div>
      </div>
    </div>
  );
}

export default App;
