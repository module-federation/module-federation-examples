import React from 'react';
import consumedRoutes from './pages/consumed-routes';

const style = {
    padding: 12,
    backgroundColor: '#cccccc',
};

const ButtonContainer = () => (
    <div style={style}>
        <section className="buttons">
            <React.Suspense fallback="Loading Button">
                {
                    consumedRoutes.map(Page => (<Page.component key={Page.path} />))
                }
            </React.Suspense>
        </section>
    </div>
);

export default ButtonContainer;
