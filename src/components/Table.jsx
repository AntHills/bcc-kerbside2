import { useState } from "react";
import dayjs from "dayjs";
import TableRow from "./TableRow.jsx";
import sortIcon from "../assets/sort.svg";
import trailerSVG from "../assets/trailer.svg";
import whitegoodsSVG from "../assets/white-goods2.svg";

function Table(props) {
  const [search, setSearch] = useState("");
  const [currentSort, setCurrentSort] = useState({
    sortType: "date_of_collection",
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
      date_of_collection: isDateElapsed(suburb.date_of_collection)
        ? "Date elapsed"
        : suburb.date_of_collection,
    };
  });

  if (currentSort.sortType === "date_of_collection") {
    suburbArray.sort((a, b) => {
      if (currentSort.sortAsc) {
        if (a.date_of_collection === "Date elapsed") return 1;
        if (b.date_of_collection === "Date elapsed") return -1;
        return new Date(a.date_of_collection) - new Date(b.date_of_collection);
      } else {
        if (a.date_of_collection === "Date elapsed") return -1;
        if (b.date_of_collection === "Date elapsed") return 1;
        return new Date(b.date_of_collection) - new Date(a.date_of_collection);
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
    if (k.date_of_collection != "Date elapsed") {
      if (dayjs(k.date_of_collection).isValid()) {
        formattedDate = dayjs(k.date_of_collection).format("DD MMMM YYYY");
      }
    } else {
      formattedDate = k.date_of_collection;
    }

    if (k.suburb.toLowerCase().includes(search.toLowerCase())) {
      return <TableRow key={k.surburb} suburb={k.suburb} date={formattedDate} />;
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
                <img src={sortIcon} className="sort-icon" alt="sort icon" />
              </div>
            </th>
            <th onClick={handleSort} id="date_of_collection" className="right">
              <div className="heading-content">
                <h4 className="heading-text">Collection week</h4>
                <img src={sortIcon} className="sort-icon" alt="sort icon" />
              </div>
            </th>
          </tr>
        </thead>
        <tbody>{tableRows}</tbody>
      </table>
      <img
        src={trailerSVG}
        className="trailer-image"
        alt="image of back of trailer"
      />
    </div>
  );
}

export default Table;
