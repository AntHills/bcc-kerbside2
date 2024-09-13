function TableRow(props) {
  return (
    <tr>
      <td className="left">{props.suburb}</td>
      <td className="right">{props.date}</td>
    </tr>
  );
}

export default TableRow;
