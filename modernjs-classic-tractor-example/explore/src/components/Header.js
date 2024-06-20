import MiniCart from 'checkout/MiniCart';
import { IMAGE_SERVER } from '../utils';
import Navigation from './Navigation';
import './Header.css';

/**
 * Header component.
 * @param {object} props - The properties of the Header component.
 * @param {HonoContext} props.c - The hono context.
 * @returns {JSX.Element} The Header component markup.
 */
const Header = ({ c }) => {
  return (
    <header className="e_Header" data-boundary="explore-header">
      <div className="e_Header__cutter">
        <div className="e_Header__inner">
          <a className="e_Header__link" href="/">
            <img
              className="e_Header__logo"
              src={`${IMAGE_SERVER}/cdn/img/logo.svg`}
              alt="Micro Frontends - Tractor Store"
            />
          </a>
          <div className="e_Header__navigation">
            <Navigation />
          </div>
          <div className="e_Header__cart">
            <MiniCart c={c} />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
