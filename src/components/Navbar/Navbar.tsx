
const Navbar = () => {
  return (
    <nav className="navbar bg-primary-subtle mb-5">
      <div className="container">
        <span className="navbar-brand mb-0 fs-2 fw-semibold">Navbar</span>
        <div className="d-flex gap-3">
          <button className="btn btn-outline-primary">Categories</button>
          <button className="btn btn-outline-primary">Add</button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;