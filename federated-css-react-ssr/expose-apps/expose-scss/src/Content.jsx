import React from "react";
import css from './baz.scss';
import css2 from './baz.module.scss';
import withStyles from 'isomorphic-style-loader/withStyles';

export default withStyles(css, css2)((props) => (
        <div>
            <div className="baz-scss" data-e2e="FEDERATED_CSS_BUTTON">this is exposed Scss Styled content</div>
            <div className={css2.baz} data-e2e="FEDERATED_CSS_BUTTON">this is exposed Scss Module Styled content</div>
        </div>
));
