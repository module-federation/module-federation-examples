import React from 'react';
import './Button.styles.scss';

const style = {
    padding: 12,
    backgroundColor: '#cccccc',
};

const Component = () => (
    <div style={style}>
        <section className="buttons">
            <div className="orange-button" data-e2e="FEDERATED_CSS_BUTTON">Scss styled Button</div>
        </section>
    </div>
);

export default Component;
