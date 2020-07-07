import React, { useState, useEffect } from 'react';

export default function Header() {
    const [ name ] = useState('Next.js!');
    const [ counter, setCounter ] = useState(0);

    useEffect(() => {
        const myClock = setInterval(() => {
            setCounter(counter + 1);
        }, 1000);

        return () => clearInterval(myClock);
    });

    return (
        <h1 className="title">
            Welcome to <a href="https://nextjs.org">{ name } { counter }</a>
        </h1>

    );
}