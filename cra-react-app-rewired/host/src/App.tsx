import React from 'react';
import logo from './logo.svg';
import './App.css';

// Module Federation - importing this from application 2
const Card = React.lazy(() =>
    // @ts-ignore
    import("remote/Card").then((module) => {
        return {
            default: module.Card,
        };
    })
);

function App() {
    return (
        <div className="App">
            <header className="App-header">
                <div>
                    This is the host application.
                </div>
                <div style={{margin: 20}}>
                    <React.Suspense fallback={<div>Loading...</div>}>
                        <Card />
                    </React.Suspense>
                </div>
            </header>
        </div>
    );
}

export default App;
