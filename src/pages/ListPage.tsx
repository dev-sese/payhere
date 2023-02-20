import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { confirmDialog, ConfirmDialog } from "primereact/confirmdialog";
import IssueModal from "modal/IssueModal";

const ListPage: React.FC = () => {
  // 현재 저장된 repository 목록
  const [checkedRepoList, setCheckedRepoList] = useState<any>(null);

  // 첫 랜더링 시 현재 localStorage에 저장된 repo들을 불러옴
  useEffect(() => {
    let localData = localStorage.getItem("checkedRepo");
    if (localData) {
      setCheckedRepoList(JSON.parse(localData));
    }
  }, []);

  // repository 버튼을 선택하면 issue 모달을 엶
  const openIssueModal = (name: string, repo: string, total: number) => {
    confirmDialog({
      message: (
        <IssueModal repoInfo={{ name: name, repo: repo, total: total }} />
      ),
      header: "Issue List",
    });
  };

  // 삭제 버튼을 선택하면 해당 repository를 선택 목록에서 제거
  const onCategoryChange = (id: string) => {
    let _selectedCategories = [...checkedRepoList];

    _selectedCategories = _selectedCategories.filter(
      (category) => category.id !== id
    );

    localStorage.setItem("checkedRepo", JSON.stringify(_selectedCategories));
    setCheckedRepoList(_selectedCategories);
  };

  return (
    <div>
      <ConfirmDialog />
      <div>
        {checkedRepoList &&
          checkedRepoList.map((repo: any) => {
            return (
              <div>
                <button
                  key={repo.id}
                  onClick={() =>
                    openIssueModal(
                      repo["full_name"].split("/")[0],
                      repo["full_name"].split("/")[1],
                      repo["open_issues_count"]
                    )
                  }
                >
                  {repo["full_name"]}
                </button>
                <button onClick={() => onCategoryChange(repo.id)}>삭제</button>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default ListPage;
