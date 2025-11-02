import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

function Hello() {
  return <h1>Hello SweetUI</h1>;
}

describe('test setup', () => {
  it('renders heading', () => {
    render(<Hello />);
    expect(screen.getByRole('heading', { name: /hello sweetui/i })).toBeInTheDocument();
  });
});
