import SearchResult from "components/SearchResult";
import React, { useEffect, useState } from "react";
import { getRepositoriesWithSearch } from "services/Search.service";

const SearchPage: React.FC = () => {
  const [searchInput, setSearchInput] = useState("");

  const [searchParam, setSearchParam] = useState("#");

  const [apiresponse, setApiresponse] = useState<any>(null);

  const [page, setPage] = useState(1);

  const searchParamChangeHandler = () => {
    setSearchParam(searchInput);
  };

  // 응답 상태값 저장 함수 필요----!

  console.log(page);

  useEffect(() => {
    getRepositoriesWithSearch(searchParam, page)
      .then((response) => {
        setApiresponse(response);
      })
      .catch((error) => {
        throw error;
      });
  }, [searchParam, page]);

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
        {apiresponse && (
          //
          <SearchResult
            repoList={apiresponse.items}
            setPage={setPage}
            totalRecords={apiresponse["total_count"]}
          />
        )}
      </div>
    </div>
  );
};

export default SearchPage;
