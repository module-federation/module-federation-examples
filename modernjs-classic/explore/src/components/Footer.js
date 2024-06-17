import { Link } from '@modern-js/runtime/router';
import { IMAGE_SERVER } from '../utils';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="e_Footer" data-boundary="explore-footer">
      <div className="e_Footer__cutter">
        <div className="e_Footer__inner">
          <div className="e_Footer__initiative">
            {/* please leave this part untouched */}
            <img
              src={`${IMAGE_SERVER}/cdn/img/neulandlogo.svg`}
              alt="neuland - Büro für Informatik"
            />
            <p>
              based on
              <Link
                to="https://micro-frontends.org/tractor-store/"
                target="_blank"
                rel="noopener noreferrer"
              >
                the tractor store 2.0
              </Link>
              <br />
              <Link
                to="https://neuland-bfi.de"
                target="_blank"
                rel="noopener noreferrer"
              >
                neuland
              </Link>{' '}
              project
            </p>
          </div>

          <div className="e_Footer__credits">
            {/* replace this details about your implementation and organization */}
            <h4>techstack</h4>
            <p>
              ssr-only, modular monolith, template strings, esbuild, hono,
              cloudflare workers
            </p>
            <p>
              build by
              <img
                src={`${IMAGE_SERVER}/cdn/img/neulandlogo.svg`}
                alt="neuland - Büro für Informatik"
              />
              <Link
                to="https://neuland-bfi.de"
                target="_blank"
                rel="noopener noreferrer"
              >
                neuland
              </Link>
              /
              <Link
                to="https://github.com/neuland/tractor-store-blueprint"
                target="_blank"
                rel="noopener noreferrer"
              >
                github
              </Link>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
