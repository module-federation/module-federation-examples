import express from 'express';
import React from 'react';
import initMiddleware from './middleware';

const app = express();

const done = () => {
  app.listen(3000, () => {
    console.log(`Server is listening on port: 3000`);
  });
};

initMiddleware(express, app, done);
