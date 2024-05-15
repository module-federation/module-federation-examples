import { loadRemote } from '@module-federation/enhanced/runtime';
import React, {Suspense} from 'react';

const Button = React.lazy(async ()=>{
    const res = await loadRemote('remote2/button');
    return res;
})

function Remote2 () {
    return <Suspense fallback={'loading'}>
        <h2>Remote2 Router</h2>
        <Button />
    </Suspense>;
}

export default Remote2;
