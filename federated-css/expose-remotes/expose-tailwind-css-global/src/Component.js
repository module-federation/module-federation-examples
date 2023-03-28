import React from 'react';
import './tailwind.global.css';

const style = {
    padding: 12,
    backgroundColor: '#cccccc',
};

const Component = () => (
    <div style={style}>
        <section className="buttons">
            <div className="btn btn-green" data-e2e="FEDERATED_CSS_BUTTON">Tailwind Global import styled Button</div>
        </section>
    </div>
);

export default Component;
