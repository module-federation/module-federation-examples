import React from 'react';
import dynamic from 'next/dynamic';
const Component =  dynamic(() => import('expose_less/Component'),
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
            <Component />
        </section>
    </div>
);

export default ButtonContainer;




