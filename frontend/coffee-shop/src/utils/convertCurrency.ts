const exchangeRates: Record<string, number> = {
    USD: 1,
    EUR: 0.92,
    GBP: 0.79,
    JPY: 149.50,
    KRW: 1325.00,
    BRL: 4.97,
    INR: 83.12,
    AED: 3.67,
}

export function formatBudget(amountUSD: number, currency: string): string {
    if (!currency || !amountUSD) return '$0.00' 
    
    const rate = exchangeRates[currency] ?? 1
    const converted = amountUSD * rate

    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: currency,
        minimumFractionDigits: 2
    }).format(converted)
}