import { IMAGE_SERVER } from '../utils';
import './CompactHeader.css';

const CompactHeader = () => {
  return (
    <header className="c_CompactHeader">
      <div className="c_CompactHeader__inner">
        <a className="c_CompactHeader__link" href="/">
          <img
            className="c_CompactHeader__logo"
            src={`${IMAGE_SERVER}/cdn/img/logo.svg`}
            alt="Micro Frontends - Tractor Store"
          />
        </a>
      </div>
    </header>
  );
};

export default CompactHeader;
