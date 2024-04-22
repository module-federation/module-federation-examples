import { loadRemote } from '@module-federation/enhanced/runtime';
import React from 'react';

const Button = React.lazy(async ()=>{
    const res = await loadRemote('remote2/button');
    return res;
})

function Remote2 () {
    return <div>
        <h2>Remote1 Router</h2>
        <Button />
    </div>;
}

export default Remote2;