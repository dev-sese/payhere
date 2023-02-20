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
  // 경고창 문구
  const toast = useRef<Toast>(null);

  // 페이지네이션
  const [first, setFirst] = useState(1);
  const onPageChange = (event: any) => {
    setPage(event.page + 1);
    setFirst(event.first);
  };

  // 체크박스 선택된 repository
  const [selectedRepository, setSelectedRepository] = useState<Category[]>([]);

  // 체크박스 선택
  const onRepositoryCheckChange = (e: any) => {
    let _selectedRepository = [...selectedRepository];
    // 체크되어 있었다면 제거, 체크되지 않았었다면 등록
    if (e.checked) {
      _selectedRepository.push(e.value);
    } else {
      _selectedRepository = _selectedRepository.filter(
        (category) => category.id !== e.value.id
      );
    }
    // 4개 제한
    if (_selectedRepository.length < 5) {
      setSelectedRepository(_selectedRepository);
    } else {
      toast.current?.show({
        severity: "warn",
        summary: "등록제한",
        detail: "repository 등록은 4개를 넘길 수 없어요",
        life: 3000,
      });
    }
  };

  // 선택된 repository가 변경되면 localStorage에 저장
  useEffect(() => {
    if (selectedRepository.length !== 0) {
      localStorage.clear();
      localStorage.setItem("checkedRepo", JSON.stringify(selectedRepository));
    }
  }, [selectedRepository]);

  // repository templete
  const repositoryTemplete = (repo: any) => {
    return (
      <div key={repo.id} className="flex align-items-center">
        <Checkbox
          inputId={repo.id}
          name="category"
          value={repo}
          onChange={onRepositoryCheckChange}
          checked={selectedRepository.some((item) => item.id === repo.id)}
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
          itemTemplate={repositoryTemplete}
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
