import { Link } from '@modern-js/runtime/router';
import './Navigation.css';

const Navigation = () => {
  return (
    <nav className="e_Navigation">
      <ul className="e_Navigation__list">
        <li className="e_Navigation__item">
          <Link to="/products">Machines</Link>
        </li>
        <li className="e_Navigation__item">
          <Link to="/stores">Stores</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
