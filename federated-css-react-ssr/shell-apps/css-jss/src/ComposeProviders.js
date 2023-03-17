import React from "react";

const Compose =  (props) =>{
    const { children, providers } = props;

    return (
        <div>
            {providers.reduceRight((acc, [Provider, providerProps]) => {
                return <Provider {...providerProps}>{acc}</Provider>
            }, children)}
        </div>
    )
}

export default Compose;
