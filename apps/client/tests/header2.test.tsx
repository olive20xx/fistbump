import '@testing-library/jest-dom'
import React from 'react';
import { render } from '@testing-library/react';
import { Header2 } from '../components/typography/header2';

describe('Header2', () => {
  it('renders the header with children', () => {
    const { getByText } = render(<Header2>Test Header</Header2>);
    const headerElement = getByText('Test Header');
    expect(headerElement).toBeInTheDocument();
    expect(headerElement.tagName).toBe('H2');
    expect(headerElement).toHaveClass('scroll-m-20');
    expect(headerElement).toHaveClass('pb-2');
    expect(headerElement).toHaveClass('text-2xl');
    expect(headerElement).toHaveClass('font-semibold');
    expect(headerElement).toHaveClass('tracking-tight');
    expect(headerElement).toHaveClass('transition-colors');
    expect(headerElement).toHaveClass('first:mt-0');
  });
});