import { useState, useEffect } from "react";
import Table from "./components/Table.jsx";

function App() {
  const [kerbsideData, setKerbsideData] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/kerbside")
      .then((res) => res.json())
      .then((data) => setKerbsideData(data));

    console.log(kerbsideData);
  }, []);

  const tableRows = kerbsideData.map((k) => {
    return (
      <tr>
        <th>{k.suburb}</th>
        <th>{k.kerbsideWeek}</th>
        <th>{k.updated}</th>
      </tr>
    );
  });

  return (
    <>
      <Table suburbs={kerbsideData} />
    </>
  );
}

export default App;
