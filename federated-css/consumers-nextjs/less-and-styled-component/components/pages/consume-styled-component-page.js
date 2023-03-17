import React from 'react';
import dynamic from 'next/dynamic';
const Component =  dynamic(() => import('expose_styled_component/Component'),
    {
        ssr: false,
    }
);

const style = {
    padding: 12,
    backgroundColor: '#cccccc',
};

const ButtonContainer = () => (
    <div style={style}>
        <br />
        <br />
        <section className="buttons">
            <Component data-e2e="FEDERATED_CSS_BUTTON">Styled Component</Component>
        </section>
    </div>
);

export default ButtonContainer;


