import React, { Suspense } from 'react';

function fetchData(url) {
  let status = 'pending';
  let result;
  let suspender = fetch(url)
    .then((response) => response.json())
    .then((data) => {
      status = 'success';
      result = data;
    }, (error) => {
      status = 'error';
      result = error;
    });

  return {
    read() {
      if (status === 'pending') {
        throw suspender;
      } else if (status === 'error') {
        throw result;
      } else if (status === 'success') {
        return result;
      }
    }
  };
}

const resource = fetchData('https://jsonplaceholder.typicode.com/todos/1');

function HelloWorld() {
  const data = resource.read(); // This will suspend if the data isn't ready
  return <pre>{JSON.stringify(data)}</pre>;
}

export default function Wrapper() {
  return (
    <Suspense fallback={<pre>Loading...</pre>}>
      <HelloWorld />
    </Suspense>
  );
}
