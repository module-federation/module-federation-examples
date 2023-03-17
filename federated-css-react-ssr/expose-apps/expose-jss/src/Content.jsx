import React from "react";
import styles from './react-jss.styles';

export default () => {
    const classes = styles();

    return (<div className={classes.button} data-e2e="FEDERATED_CSS_BUTTON">This is Jss Styled Content</div>);
};
