import { Link } from '@modern-js/runtime/router';

const NestedRoute = () => {
  return (
    <div className="nested-container">
      <h2>Nested Routes Example</h2>

      <div className="demo-box">
        <h3>Navigation Demo</h3>
        <p>
          This page demonstrates nested routing capabilities in Modern.js. Try
          navigating to different sections using the links below:
        </p>

        <div className="button-group">
          <Link to="/nested-routes/pathname" className="demo-button">
            Module Federation Demo
          </Link>
          <Link to="/" className="demo-button secondary">
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NestedRoute;
