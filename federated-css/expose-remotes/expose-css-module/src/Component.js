import React from 'react';
import * as moduleStyles from './Button.styles.module.css';

const classes = moduleStyles.default || moduleStyles;

const style = {
  padding: 12,
  backgroundColor: '#cccccc',
};

const Component = () => (
  <div style={style}>
    <section className="buttons">
      <div className={classes.redButton} data-e2e="FEDERATED_CSS_BUTTON">
        Css Module styled Button
      </div>
    </section>
  </div>
);

export default Component;
