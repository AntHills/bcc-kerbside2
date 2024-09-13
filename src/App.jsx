import { useState, useEffect } from "react";
import Table from "./components/Table.jsx";
import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
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

  useEffect(() => {
    fetch("/api/pull-data");
  }, []);

  return (
    <>
      <Header />
      <div className="app-container">
        <Table
          suburbs={kerbsideData}
          lastUpdated={dayjs(kerbsideData[0].updated).format("DD MMMM YYYY")}
        />
      </div>
      <Footer />
    </>
  );
}

export default App;
