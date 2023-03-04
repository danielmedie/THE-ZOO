import { Link } from 'react-router-dom';
import './nav.scss';

export const Navigation = () => {
  return (
    <nav className="nav">
      <ul className="nav-list">
        <li className="nav-item">
          <Link to="/animals" className="nav-link">
            Djuren
          </Link>
        </li>
      </ul>
    </nav>
  );
};
