import React from 'react';
const Component = React.lazy(() => import('expose_tailwind_css_global/Component'));

const style = {
    padding: 12,
    backgroundColor: '#cccccc',
};

const CssButtonContainer = () => (
    <div style={style}>
        <br />
        <br />
        <section className="buttons">
            <React.Suspense fallback="Loading Button">
                <Component />
            </React.Suspense>
        </section>
    </div>
);

export default CssButtonContainer;




