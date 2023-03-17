import React from "react";
import css2 from './baz.css';
import withStyles from 'isomorphic-style-loader/withStyles';

export default withStyles(css2)((props) => (
        <div>
            <span className="baz" data-e2e="FEDERATED_CSS_BUTTON">This is exposed Css Styled content</span>
        </div>
));
