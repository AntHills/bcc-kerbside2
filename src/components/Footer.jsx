function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer-container">
      <p>&copy; {year} appsbyjames.com</p>
    </footer>
  );
}

export default Footer;
