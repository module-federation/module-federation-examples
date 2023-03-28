import React from "react";
import css from './baz.less';
import css2 from './baz.module.less';
import withStyles from 'isomorphic-style-loader/withStyles';

export default withStyles(css, css2)((props) => (
        <div>
            <div className="baz-less" data-e2e="FEDERATED_CSS_BUTTON">this is exposed Less Styled content</div>
            <div className={css2.baz} data-e2e="FEDERATED_CSS_BUTTON">this is exposed Less Module Styled content</div>
        </div>
));
