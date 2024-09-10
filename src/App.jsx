import { useState, useEffect } from "react";

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
      <table>{tableRows}</table>
    </>
  );
}

export default App;
