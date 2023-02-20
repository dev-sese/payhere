import ListPage from "pages/ListPage";
import SearchPage from "pages/SearchPage";
import "primereact/resources/themes/bootstrap4-light-purple/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import { TabMenu } from "primereact/tabmenu";
import { Button } from "primereact/button";

import "./App.css";

function App() {
  const items = [
    {
      label: "repo 검색",
      icon: "pi pi-fw pi-home",
    },
    {
      label: "repo list",
      icon: "pi pi-fw pi-calendar",
    },
  ];

  return (
    <div className="App">
      {/* <h1>페이히어 프론트엔드 엔지니어 과제</h1> */}
      <div className="card">
        <TabMenu model={items} />
      </div>
      <SearchPage></SearchPage>
      <ListPage></ListPage>
    </div>
  );
}

export default App;
