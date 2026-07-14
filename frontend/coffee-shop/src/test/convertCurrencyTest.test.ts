import { describe, it, expect } from 'vitest'
import { formatBudget } from '../utils/convertCurrency'

describe('formatBudget', () => {

    it('should format USD correctly', () => {
        const result = formatBudget(10, 'USD')
        expect(result).toBe('$10.00')
    })

    it('should convert and format GBP correctly', () => {
        const result = formatBudget(10, 'GBP')
        expect(result).toBe('£7.90')
    })

    it('should return $0.00 when budget is 0', () => {
        const result = formatBudget(0, 'USD')
        expect(result).toBe('$0.00')
    })

    it('should fallback gracefully when currency is missing', () => {
        const result = formatBudget(10, '')
        expect(result).toBe('$0.00')
    })

})