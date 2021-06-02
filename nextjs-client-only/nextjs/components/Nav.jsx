import React from "react";
import Link from "next/link";

export default function Nav() {
  return (
    <nav>
      This a Next.js host 🚀 | <Link shallow href="/">Reception</Link> | <Link shallow href="/chat">Chat</Link>
    </nav>
  );
}
