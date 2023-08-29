import React from 'react';
import { screen, render } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from '../App';

describe('App', () => {
  it('should have remote button', async () => {
    render(<App />);
    expect(await screen.findByRole('button', { name: 'Remote button' })).toBeInTheDocument();
  });
});
