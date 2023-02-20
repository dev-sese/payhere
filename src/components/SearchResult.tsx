import { useEffect, useRef, useState } from "react";
import { Checkbox } from "primereact/checkbox";
import { Toast } from "primereact/toast";
import { DataView } from "primereact/dataview";

interface Category {
  id: number;
  name: string;
  key: string;
}

const SearchResult = ({ repoList, setPage, totalRecords }: any) => {
  const toast = useRef<Toast>(null);
  const [selectedCategories, setSelectedCategories] = useState<Category[]>([]);

  const [first, setFirst] = useState(1);

  const onPageChange = (event: any) => {
    setPage(event.page + 1);
    setFirst(event.first);
  };

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

  const repoListTemplete = (repo: any) => {
    return (
      <div key={repo.id} className="flex align-items-center">
        <Checkbox
          inputId={repo.id}
          name="category"
          value={repo}
          onChange={onCategoryChange}
          checked={selectedCategories.some((item) => item.id === repo.id)}
        />
        <label htmlFor={repo.id} className="ml-2">
          {repo["full_name"]}
        </label>
      </div>
    );
  };

  return (
    <div>
      <Toast ref={toast} />
      {repoList.length !== 0 && (
        <DataView
          value={repoList}
          lazy
          itemTemplate={repoListTemplete}
          paginator
          onPage={onPageChange}
          rows={10}
          first={first}
          totalRecords={totalRecords}
        />
      )}
    </div>
  );
};

export default SearchResult;
