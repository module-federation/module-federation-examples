import React, { useState } from 'react';

export default function Header() {
    const [ name ] = useState('Next.js!');

    return (
        <h1 className="title">
            Welcome to <a href="https://nextjs.org">{ name }</a>
        </h1>

    );
}