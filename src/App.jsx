import { useState, useEffect } from "react";
import Table from "./components/Table.jsx";
import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import dayjs from "dayjs";

function App() {
  const [kerbsideData, setKerbsideData] = useState([
    {
      suburb: "",
      date_of_collection: "",
    },
  ]);

  useEffect(() => {
    fetch("https://data.brisbane.qld.gov.au/api/explore/v2.1/catalog/datasets/kerbside-large-item-collection-schedule/records")
      .then((res) => res.json())
      .then((data) => setKerbsideData(data.results));
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
