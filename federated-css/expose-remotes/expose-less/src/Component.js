import React from 'react';
import './Button.styles.less';

const style = {
    padding: 12,
    backgroundColor: '#cccccc',
};

const Component = () => (
    <div style={style}>
        <section className="buttons">
            <div className="brown-button" data-e2e="FEDERATED_CSS_BUTTON">Less styled Button</div>
        </section>
    </div>
);

export default Component;
