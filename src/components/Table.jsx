import { useState } from "react";
import dayjs from "dayjs";
import TableRow from "./TableRow.jsx";
import sortIcon from "../assets/sort.svg";
import trailerSVG from "../assets/trailer.svg";
import whitegoodsSVG from "../assets/white-goods2.svg";

function Table(props) {
  const [search, setSearch] = useState("");
  const [currentSort, setCurrentSort] = useState({
    sortType: "kerbsideWeek",
    sortAsc: true,
  });
  const currentDate = dayjs();

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

  const isDateElapsed = (dateString) => {
    const date = dayjs(dateString);
    return currentDate.diff(date, "day") >= 7;
  };

  //Sort table based on sort state
  const suburbArray = props.suburbs.map((suburb) => {
    return {
      ...suburb,
      kerbsideWeek: isDateElapsed(suburb.kerbsideWeek)
        ? "Date elapsed"
        : suburb.kerbsideWeek,
    };
  });

  if (currentSort.sortType === "kerbsideWeek") {
    suburbArray.sort((a, b) => {
      if (currentSort.sortAsc) {
        if (a.kerbsideWeek === "Date elapsed") return 1;
        if (b.kerbsideWeek === "Date elapsed") return -1;
        return new Date(a.kerbsideWeek) - new Date(b.kerbsideWeek);
      } else {
        if (a.kerbsideWeek === "Date elapsed") return -1;
        if (b.kerbsideWeek === "Date elapsed") return 1;
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
    let formattedDate = "";
    if (k.kerbsideWeek != "Date elapsed") {
      formattedDate = dayjs(k.kerbsideWeek).format("DD MMMM YYYY");
    } else {
      formattedDate = k.kerbsideWeek;
    }

    if (k.suburb.toLowerCase().includes(search.toLowerCase())) {
      return <TableRow key={k.id} suburb={k.suburb} date={formattedDate} />;
    } else {
      return;
    }
  });

  return (
    <div className="table-container">
      <img
        src={whitegoodsSVG}
        alt="image of white goods"
        className="white-goods-image"
      />
      <div className="table-search-container">
        <h3>Last checked: {props.lastUpdated}</h3>
        <input
          className="search-input"
          type="text"
          placeholder="search..."
          onChange={handleSearch}
          value={search}
        />
      </div>
      <table className="suburb-table">
        <thead className="table-header">
          <tr>
            <th onClick={handleSort} id="suburb" className="left">
              <div className="heading-content">
                <h4 className="heading-text">Suburb</h4>
                <img src={sortIcon} className="sort-icon" />
              </div>
            </th>
            <th onClick={handleSort} id="kerbsideWeek" className="right">
              <div className="heading-content">
                <h4 className="heading-text">Collection week</h4>
                <img src={sortIcon} className="sort-icon" />
              </div>
            </th>
          </tr>
        </thead>
        <tbody>{tableRows}</tbody>
      </table>
      <img src={trailerSVG} className="trailer-image" />
    </div>
  );
}

export default Table;
