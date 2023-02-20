import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { getIssuesInRepository } from "services/Search.service";

const ListPage: React.FC = () => {
  const [issueList, setIssueList] = useState<any>(null);

  useEffect(() => {
    getIssuesInRepository("pay-rails", "pay").then((response) => {
      setIssueList(response);
    });
  }, []);

  return (
    <div>
      <div>우애앵 리스트페이지</div>
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
