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
    const fetchAllData = async () => {
      const limit = 100;
      let offset = 0;
      let allResults = [];
      let keepFetching = true;

      try {
        while (keepFetching) {
          const url = `https://data.brisbane.qld.gov.au/api/explore/v2.1/catalog/datasets/kerbside-large-item-collection-schedule/records?limit=${limit}&offset=${offset}`;
          const res = await fetch(url);
          const data = await res.json();

          if (data.results.length > 0) {
            allResults = [...allResults, ...data.results];
            offset += limit;
          } else {
            keepFetching = false;
          }
        }

        setKerbsideData(allResults);
      } catch (err) {
        console.error('Failed to fetch kerbside data:', err);
      }
    };

    fetchAllData();
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
