import { useState } from "react";
import dayjs from "dayjs";
import TableRow from "./TableRow.jsx";
import sortIcon from "../assets/sort.svg";

function Table(props) {
  const [search, setSearch] = useState("");
  const [currentSort, setCurrentSort] = useState({
    sortType: "kerbsideWeek",
    sortAsc: true,
  });

  function handleSearch(event) {
    const { value } = event.target;
    setSearch((s) => value);
  }

  function handleSort(event) {
    const { id } = event.currentTarget;
    setCurrentSort((c) => {
      return {
        sortType: id,
        sortAsc: !c.sortAsc,
      };
    });
  }

  //Sort table based on sort state
  const suburbArray = props.suburbs;

  if (currentSort.sortType === "kerbsideWeek") {
    suburbArray.sort((a, b) => {
      if (currentSort.sortAsc) {
        return new Date(a.kerbsideWeek) - new Date(b.kerbsideWeek);
      } else {
        return new Date(b.kerbsideWeek) - new Date(a.kerbsideWeek);
      }
    });
  } else if (currentSort.sortType === "suburb") {
    suburbArray.sort((a, b) => {
      if (currentSort.sortAsc) {
        return a.suburb.localeCompare(b.suburb);
      } else {
        return b.suburb.localeCompare(a.suburb);
      }
    });
  }

  //Create table row elements
  const tableRows = suburbArray.map((k) => {
    const formattedDate = dayjs(k.kerbsideWeek).format("DD MMMM YYYY");

    if (k.suburb.toLowerCase().includes(search.toLowerCase())) {
      return <TableRow key={k.id} suburb={k.suburb} date={formattedDate} />;
    } else {
      return;
    }
  });

  return (
    <div className="table-container">
      <input
        className="search-input"
        type="text"
        placeholder="search..."
        onChange={handleSearch}
        value={search}
      />
      <table className="suburb-table">
        <thead className="table-header">
          <tr>
            <th onClick={handleSort} id="suburb">
              <div className="heading-content">
                <h4 className="heading-text">Suburb</h4>
                <img src={sortIcon} className="sort-icon" />
              </div>
            </th>
            <th onClick={handleSort} id="kerbsideWeek">
              <div className="heading-content">
                <h4 className="heading-text">Collection week</h4>
                <img src={sortIcon} className="sort-icon" />
              </div>
            </th>
          </tr>
        </thead>
        <tbody>{tableRows}</tbody>
      </table>
    </div>
  );
}

export default Table;
