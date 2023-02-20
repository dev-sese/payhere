import SearchResult from "components/SearchResult";
import React, { useEffect, useState } from "react";
import { getRepositoriesWithSearch } from "services/Search.service";

const SearchPage: React.FC = () => {
  //검색어 입력
  const [searchInput, setSearchInput] = useState("");
  //  API params(검색어)
  const [searchParam, setSearchParam] = useState("#");

  // API 응답값
  const [apiresponse, setApiresponse] = useState<any>(null);

  // 페이지네이션
  const [page, setPage] = useState(1);

  // 검색버튼을 누르면 해당 검색어를 API params 값으로 저장
  const searchParamChangeHandler = () => {
    setSearchParam(searchInput);
  };

  // 검색어나 페이지가 변하면 repository 목록 조회 API 호출
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
      <div>
        {apiresponse && (
          // repository 목록
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
