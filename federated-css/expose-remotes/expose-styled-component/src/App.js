import React from 'react';
const Component = React.lazy(() => import('./StyledComponent'));

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
                <Component data-e2e="FEDERATED_CSS_BUTTON">Styled Component</Component>
            </React.Suspense>
        </section>
    </div>
);

export default CssButtonContainer;

