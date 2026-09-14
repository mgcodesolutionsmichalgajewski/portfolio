export default function Footer() {
  return (
    <footer>
      <div className="wrap footer">
        <a className="brand" href="#start">
          MG<span>.</span>
          <small>Code Solutions</small>
        </a>
        <span>© {new Date().getFullYear()} MG Code Solutions Michał Gajewski</span>
        <a href="#start">Wróć na górę ↑</a>
      </div>
    </footer>
  );
}
