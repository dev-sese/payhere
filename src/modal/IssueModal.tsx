import React, { useEffect, useState } from "react";
import { getIssuesInRepository } from "services/Search.service";
import { DataView } from "primereact/dataview";

interface IssueModalProps {
  repoInfo: {
    name: string;
    repo: string;
    total: number;
  };
}

const IssueModal: React.FC<IssueModalProps> = ({ repoInfo }) => {
  const [issueList, setIssueList] = useState<any>(null);

  const [first, setFirst] = useState(1);
  const onPageChange = (event: any) => {
    setFirst(event.first);
  };

  useEffect(() => {
    let page = first / 10;
    getIssuesInRepository(repoInfo.name, repoInfo.repo, page + 1).then(
      (response) => {
        setIssueList(response);
      }
    );
  }, [first]);

  const itemTemplate = (issue: any) => {
    return (
      <div key={issue.title} onClick={() => window.open(issue["html_url"])}>
        <p>{`${repoInfo.name}/${repoInfo.repo}`}</p>
        <p>{issue.title}</p>
      </div>
    );
  };

  return (
    <div>
      {issueList && (
        <DataView
          value={issueList}
          itemTemplate={itemTemplate}
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
