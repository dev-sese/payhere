import React, { useEffect, useState } from "react";
import { getRepositoriesWithSearch } from "services/Search.service";
import { Checkbox } from "primereact/checkbox";
import { Toast } from "primereact/toast";

interface Category {
  id: number;
  name: string;
  key: string;
}

const Items = ({ repoList }: any) => {
  const [selectedCategories, setSelectedCategories] = useState<Category[]>([]);

  const onCategoryChange = (e: any) => {
    let _selectedCategories = [...selectedCategories];

    if (e.checked) {
      _selectedCategories.push(e.value);
    } else {
      _selectedCategories = _selectedCategories.filter(
        (category) => category.id !== e.value.id
      );
    }

    if (_selectedCategories.length < 5) {
      setSelectedCategories(_selectedCategories);
    } else {
      console.log("4개 넘어갔어요!!");
    }
  };

  useEffect(() => {
    if (selectedCategories.length !== 0) {
      localStorage.clear();
      localStorage.setItem("checkedRepo", JSON.stringify(selectedCategories));
    }
  }, [selectedCategories]);

  return (
    <div>
      {repoList.length !== 0 &&
        repoList.map((data: any) => {
          return (
            <div key={data.id} className="flex align-items-center">
              <Checkbox
                inputId={data.id}
                name="category"
                value={data}
                onChange={onCategoryChange}
                checked={selectedCategories.some((item) => item.id === data.id)}
              />
              <label htmlFor={data.id} className="ml-2">
                {data["full_name"]}
              </label>
            </div>
          );
        })}
    </div>
  );
};

const SearchPage: React.FC = () => {
  const [searchInput, setSearchInput] = useState("");

  const [searchParam, setSearchParam] = useState("#");

  const [apiresponse, setApiresponse] = useState<any>([]);

  const searchParamChangeHandler = () => {
    setSearchParam(searchInput);
  };

  // 응답 상태값 저장 함수 필요----!

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
        {apiresponse.length !== 0 && (
          //
          <Items repoList={apiresponse} />
        )}
      </div>
    </div>
  );
};

export default SearchPage;
