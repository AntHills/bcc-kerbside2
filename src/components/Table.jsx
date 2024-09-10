import { useState } from "react";

function Table(props) {
  const [search, setSearch] = useState("");

  function handleSearch(event) {
    const { value } = event.target;
    setSearch((s) => value);
  }

  const suburbArray = props.suburbs;

  const tableRows = suburbArray.map((k) => {
    if (k.suburb.toLowerCase().includes(search.toLowerCase())) {
      return (
        <tr>
          <td>{k.suburb}</td>
          <td>{k.kerbsideWeek}</td>
          <td>{k.updated}</td>
        </tr>
      );
    } else {
      return;
    }
  });

  return (
    <div className="table-container">
      <input
        type="text"
        placeholder="search..."
        onChange={handleSearch}
        value={search}
      />
      <table className="suburb-table">
        <thead>
          <tr>
            <th>Suburb</th>
            <th>Collection week starts</th>
            <th>Date updated</th>
          </tr>
        </thead>
        <tbody>{tableRows}</tbody>
      </table>
    </div>
  );
}

export default Table;
