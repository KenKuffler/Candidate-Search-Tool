import { Link } from 'react-router-dom';

const Nav = () => {
  return (
    <nav style={{ backgroundColor: 'black', padding: '1rem' }}>
      <Link to="/" style={{ color: 'white', marginRight: '1rem' }}>
        Home
      </Link>
      <Link to="/SavedCandidates" style={{ color: 'white' }}>
        Potential Candidates
      </Link>
    </nav>
  );
};

export default Nav;
