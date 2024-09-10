import { useState, useEffect } from "react";
import Table from "./components/Table.jsx";
import Header from "./components/Header.jsx";
import dayjs from "dayjs";

function App() {
  const [kerbsideData, setKerbsideData] = useState([
    {
      id: 1,
      kerbsideWeek: "",
      suburb: "",
      updated: "",
    },
  ]);

  useEffect(() => {
    fetch("/api/kerbside")
      .then((res) => res.json())
      .then((data) => setKerbsideData(data));
  }, []);

  return (
    <div className="app-container">
      <Header
        lastUpdated={dayjs(kerbsideData[0].updated).format("DD MMMM YYYY")}
      />
      <Table suburbs={kerbsideData} />
    </div>
  );
}

export default App;
