import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { confirmDialog, ConfirmDialog } from "primereact/confirmdialog";
import IssueModal from "modal/IssueModal";

const ListPage: React.FC = () => {
  const [checkedRepoList, setCheckedRepoList] = useState<any>(null);

  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let localData = localStorage.getItem("checkedRepo");
    if (localData) {
      setCheckedRepoList(JSON.parse(localData));
    }
  }, []);

  const openIssueModal = (name: string, repo: string) => {
    confirmDialog({
      message: <IssueModal repoInfo={{ name: name, repo: repo }} />,
      header: "Issue List",
    });
  };

  return (
    <div>
      <div>우애앵 리스트페이지</div>
      <ConfirmDialog />
      <div>
        {checkedRepoList &&
          checkedRepoList.map((repo: any) => {
            return (
              <button
                key={repo.id}
                onClick={() =>
                  openIssueModal(
                    repo["full_name"].split("/")[0],
                    repo["full_name"].split("/")[1]
                  )
                }
              >
                {repo["full_name"]}
              </button>
            );
          })}
      </div>
    </div>
  );
};

export default ListPage;
