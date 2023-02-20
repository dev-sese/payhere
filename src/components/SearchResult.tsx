import { useEffect, useRef, useState } from "react";
import { Checkbox } from "primereact/checkbox";
import { Toast } from "primereact/toast";

interface Category {
  id: number;
  name: string;
  key: string;
}

const SearchResult = ({ repoList }: any) => {
  const toast = useRef<Toast>(null);
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
      toast.current?.show({
        severity: "warn",
        summary: "등록제한",
        detail: "repository 등록은 4개를 넘길 수 없어요",
        life: 3000,
      });
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
      <Toast ref={toast} />
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

export default SearchResult;
