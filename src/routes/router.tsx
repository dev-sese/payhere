import ListPage from "pages/ListPage";
import SearchPage from "pages/SearchPage";
import { Navigate, Route, Routes } from "react-router-dom";

const Router = () => {
  return (
    <Routes>
      <Route path="search" element={<SearchPage />} />
      <Route path="list" element={<ListPage />} />
      <Route path="*" element={<Navigate replace to="/search" />} />
    </Routes>
  );
};

export default Router;
