import React from "react";
import { useEffect } from "react";
import { getIssuesInRepository } from "services/Search.service";

const ListPage: React.FC = () => {
  useEffect(() => {
    getIssuesInRepository("pay-rails", "pay");
  }, []);

  return <div>우애애앵</div>;
};

export default ListPage;
