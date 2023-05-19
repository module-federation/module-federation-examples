import React from 'react';
import styles from './react-jss.styles';

const Button = () => {
    const classes = styles();

    return (<div className={classes.button} data-e2e="FEDERATED_CSS_BUTTON">Federated Button with Jss styling</div>);
};

export default Button;
