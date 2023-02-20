import React, { useEffect, useState } from "react";
import { getIssuesInRepository } from "services/Search.service";

interface IssueModalProps {
  repoInfo: {
    name: string;
    repo: string;
  };
}

const IssueModal: React.FC<IssueModalProps> = ({ repoInfo }) => {
  const [issueList, setIssueList] = useState<any>(null);

  useEffect(() => {
    getIssuesInRepository(repoInfo.name, repoInfo.repo).then((response) => {
      setIssueList(response);
    });
  }, []);
  return (
    <div>
      {issueList &&
        issueList.map((issue: any) => {
          return (
            <p key={issue.title} onClick={() => window.open(issue["html_url"])}>
              {issue.title}
            </p>
          );
        })}
    </div>
  );
};

export default IssueModal;
