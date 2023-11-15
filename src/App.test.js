import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import App from './App';

describe('App Component', () => {

  it('renders without crashing', () => {
    render(<App />);
    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });

  it('renders the course plan button', () => {
    render(<App />);
    const buttonElement = screen.getByText(/course plan/i);
    expect(buttonElement).toBeInTheDocument();
  });

});
