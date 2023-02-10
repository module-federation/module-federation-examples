import React from 'react';
import './Button.css';

const style = {
    padding: 12,
    backgroundColor: '#cccccc',
};

const CssButtonContainer = () => (
    <div style={style}>
        <section className="buttons">
            <div className="red-button" data-e2e="FEDERATED_CSS_BUTTON">Css styled Button</div>
        </section>
    </div>
);

export default CssButtonContainer;
