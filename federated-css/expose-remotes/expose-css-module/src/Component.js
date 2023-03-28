import React from 'react';
import classes from './Button.styles.module.css';

const style = {
    padding: 12,
    backgroundColor: '#cccccc',
};

const Component = () => (
    <div style={style}>
        <section className="buttons">
            <div className={classes.redButton} data-e2e="FEDERATED_CSS_BUTTON">Css Module styled Button</div>
        </section>
    </div>
);

export default Component;
