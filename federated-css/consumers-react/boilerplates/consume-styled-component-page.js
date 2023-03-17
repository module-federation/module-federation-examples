import React from 'react';
const StyledComponent = React.lazy(() => import('expose_styled_component/Component'));

const style = {
    padding: 12,
    backgroundColor: '#cccccc',
};

const ButtonContainer = () => (
    <div style={style}>
        <br />
        <br />
        <section className="buttons">
            <React.Suspense fallback="Loading Button">
                <StyledComponent data-e2e="FEDERATED_CSS_BUTTON">  Federated Styled Button </StyledComponent>
            </React.Suspense>
        </section>
    </div>
);

export default ButtonContainer;
