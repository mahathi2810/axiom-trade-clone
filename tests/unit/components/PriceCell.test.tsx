import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { PriceCell } from '@/components/molecules/PriceCell/PriceCell';

describe('PriceCell', () => {
  it('renders price correctly', () => {
    render(
      <PriceCell price={0.00001234} priceChange={5.5} direction="up" />
    );
    
    expect(screen.getByText(/\$0\.00001234/)).toBeInTheDocument();
  });

  it('shows positive change with green color', () => {
    render(
      <PriceCell price={0.001} priceChange={10.5} direction="up" />
    );
    
    const changeElement = screen.getByText(/\+10\.5%/);
    expect(changeElement).toHaveClass('text-axiom-green');
  });

  it('shows negative change with red color', () => {
    render(
      <PriceCell price={0.001} priceChange={-5.2} direction="down" />
    );
    
    const changeElement = screen.getByText(/-5\.2%/);
    expect(changeElement).toHaveClass('text-axiom-red');
  });
});
