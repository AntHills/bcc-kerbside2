function TableRow(props) {

  function toTitleCase(str) {
  return str
    .toLowerCase()
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

  return (
    <tr>
      <td className="left">{toTitleCase(props.suburb)}</td>
      <td className="right">{props.date}</td>
    </tr>
  );
}

export default TableRow;
