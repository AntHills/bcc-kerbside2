function Header(props) {
  return (
    <header className="header-container">
      <h1>Brisbane Kerbside Collection</h1>
      <h2>
        Use this tool to find the kerbside collection week for Brisbane suburbs.
      </h2>
      <h3>Last checked: {props.lastUpdated}</h3>
    </header>
  );
}

export default Header;
