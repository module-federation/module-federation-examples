import React from 'react';
import classes from './tailwind.module.css';

const style = {
    padding: 12,
    backgroundColor: '#cccccc',
};

const Component = () => (
    <div style={style}>
        <section className="buttons">
            <div className={`${classes.btn} ${classes.btnBlue}`} data-e2e="FEDERATED_CSS_BUTTON">Tailwind Css Module styled Button</div>
        </section>
    </div>
);

export default Component;
