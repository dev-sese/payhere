import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { getIssuesInRepository } from "services/Search.service";

const ListPage: React.FC = () => {
  const [issueList, setIssueList] = useState<any>(null);

  const [checkedRepoList, setCheckedRepoList] = useState<any>(null);

  useEffect(() => {
    getIssuesInRepository("pay-rails", "pay").then((response) => {
      setIssueList(response);
    });
    let localData = localStorage.getItem("checkedRepo");
    if (localData) {
      setCheckedRepoList(JSON.parse(localData));
    }
  }, []);

  return (
    <div>
      <div>우애앵 리스트페이지</div>
      <div>
        {checkedRepoList &&
          checkedRepoList.map((repo: any) => {
            return <p key={repo.id}>{repo["full_name"]}</p>;
          })}
      </div>
      <div>
        {issueList &&
          issueList.map((issue: any) => {
            return <p key={issue.title}>{issue.title}</p>;
          })}
      </div>
    </div>
  );
};

export default ListPage;
