import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import App from '@src/App.js';

describe('App Component', () => {
  beforeAll(async ()=>{
    await require('federation-test')
  });
  test('renders the main heading', () => {
    render(<App />);
    const mainHeading = screen.getByTestId('main-heading');
    expect(mainHeading).toBeInTheDocument();
  });

  test('renders the subheading', () => {
    render(<App />);
    const subHeading = screen.getByTestId('sub-heading');
    expect(subHeading).toBeInTheDocument();
  });

  test('renders the RemoteButton with fallback', async () => {
    render(<App />);
    const remoteButton = await screen.findByTestId('remote-button');
    expect(remoteButton).toBeInTheDocument();
  });
});
