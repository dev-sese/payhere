import React, { useEffect, useState } from "react";
import { getIssuesInRepository } from "services/Search.service";
import { DataView } from "primereact/dataview";
import "./IssueModal.css";

interface IssueModalProps {
  repoInfo: {
    name: string;
    repo: string;
    total: number;
  };
}

const IssueModal: React.FC<IssueModalProps> = ({ repoInfo }) => {
  // issue 조회 API 응답값
  const [issueList, setIssueList] = useState<any>(null);

  // 페이지네이션
  const [first, setFirst] = useState(1);
  const onPageChange = (event: any) => {
    setFirst(event.first);
  };

  // 페이지가 변하면 issue 조회 API 호출
  useEffect(() => {
    let page = first / 10;
    getIssuesInRepository(repoInfo.name, repoInfo.repo, page + 1).then(
      (response) => {
        setIssueList(response);
      }
    );
  }, [first]);

  // issue template
  const issueTemplate = (issue: any) => {
    return (
      <div key={issue.title} onClick={() => window.open(issue["html_url"])}>
        <p>{`${repoInfo.name}/${repoInfo.repo}`}</p>
        <p>{issue.title}</p>
      </div>
    );
  };

  return (
    <div className="m12 items-start">
      {issueList && (
        <DataView
          value={issueList}
          itemTemplate={issueTemplate}
          lazy
          paginator
          rows={10}
          onPage={onPageChange}
          first={first}
          totalRecords={repoInfo.total}
        />
      )}
    </div>
  );
};

export default IssueModal;
