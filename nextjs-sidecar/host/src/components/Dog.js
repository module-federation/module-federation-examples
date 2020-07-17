import React, { useState, useEffect } from "react";

export default function Dog() {
  const [id, setId] = useState(1);

  useEffect(() => {
    const myClock = setInterval(() => {
      setId(id + 1);
    }, 2500);

    return () => clearInterval(myClock);
  });

  return (
    <img
      alt=""
      src={`https://placedog.net/500/280?id=${id}`}
      style={{
        padding: "1em",
        border: "10px solid green",
        width: 500,
        height: 280,
      }}
    />
  );
}
