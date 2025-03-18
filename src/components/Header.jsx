import { Link } from "react-router-dom";

function Header() {
  return (
    <header className="bg-dark text-white p-4 shadow">
      <nav className="container navbar navbar-expand-lg navbar-dark">
        <Link className="navbar-brand" to="/">
          Tobi Onibudo
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item me-4">
              <Link className="nav-link" to="/">
                Home
              </Link>
            </li>
            <li className="nav-item me-4">
              <Link className="nav-link" to="/about">
                About
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/projects">
                Projects
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
}

export default Header;
