import { describe, it, expect } from 'vitest';
import {
  formatPrice,
  formatCompactNumber,
  formatPercentage,
  truncateAddress,
} from '@/lib/utils/formatters';

describe('formatters', () => {
  describe('formatPrice', () => {
    it('formats very small numbers with scientific notation', () => {
      expect(formatPrice(0.000001)).toMatch(/\$.*e/i);
    });

    it('formats small numbers with many decimals', () => {
      expect(formatPrice(0.00012345)).toBe('$0.00012345');
    });

    it('formats regular numbers', () => {
      expect(formatPrice(123.45)).toBe('$123.4500');
    });
  });

  describe('formatCompactNumber', () => {
    it('formats thousands as K', () => {
      expect(formatCompactNumber(1500)).toBe('1.5K');
    });

    it('formats millions as M', () => {
      expect(formatCompactNumber(1500000)).toBe('1.50M');
    });
  });

  describe('formatPercentage', () => {
    it('adds + prefix for positive numbers', () => {
      expect(formatPercentage(5.5)).toBe('+5.5%');
    });

    it('shows negative numbers correctly', () => {
      expect(formatPercentage(-3.2)).toBe('-3.2%');
    });
  });

  describe('truncateAddress', () => {
    it('truncates long addresses', () => {
      const address = 'AbCdEfGhIjKlMnOpQrStUvWxYz123456';
      expect(truncateAddress(address, 4, 4)).toBe('AbCd...3456');
    });
  });
});
