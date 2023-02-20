import React, { useEffect, useState } from "react";
import { getRepositoriesWithSearch } from "services/Search.service";

const SearchPage: React.FC = () => {
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
        let saveKeyList: any = [];
        response?.slice(0, 4).map((data) => {
          window.localStorage.setItem(data.id + "", JSON.stringify(data));
          saveKeyList = [...saveKeyList, data.id];
        });
        console.log(saveKeyList);
        window.localStorage.setItem("keyList", JSON.stringify(saveKeyList));
      })
      .catch((error) => {
        throw error;
      });
  }, [searchParam]);

  return (
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
  );
};

export default SearchPage;
