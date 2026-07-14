import { describe, it, expect } from 'vitest'

interface CartItem {
    _id: string
    name: string
    price: number
    quantity: number
}

function addToCart(cart: CartItem[], id: string, name: string, price: number, quantity: number): CartItem[] {
    if (quantity === 0) return cart

    const existing = cart.find(item => item._id === id)
    if (existing) {
        return cart.map(item =>
            item._id === id
                ? { ...item, quantity: item.quantity + quantity }
                : item
        )
    }
    return [...cart, { _id: id, name, price, quantity }]
}

function removeFromCart(cart: CartItem[], id: string): CartItem[] {
    return cart.filter(item => item._id !== id)
}

function getCartQuantity(cart: CartItem[], id: string): number {
    return cart.find(item => item._id === id)?.quantity ?? 0
}

describe('addToCart', () => {

    it('should add a new item to an empty cart', () => {
        const result = addToCart([], 'esp_id', 'Espresso', 2, 1)
        expect(result).toHaveLength(1)
        expect(result[0]).toEqual({ _id: 'esp_id', name: 'Espresso', price: 2, quantity: 1 })
    })

    it('should merge quantities when adding an existing item', () => {
        const cart = [{ _id: 'esp_id', name: 'Espresso', price: 2, quantity: 2 }]
        const result = addToCart(cart, 'esp_id', 'Espresso', 2, 3)
        expect(result).toHaveLength(1)
        expect(result[0].quantity).toBe(5)
    })

    it('should not add item when quantity is 0', () => {
        const result = addToCart([], 'esp_id', 'Espresso', 2, 0)
        expect(result).toHaveLength(0)
    })

    it('should keep existing items when adding a new one', () => {
        const cart = [{ _id: 'esp_id', name: 'Espresso', price: 2, quantity: 1 }]
        const result = addToCart(cart, 'lat_id', 'Latte', 4, 2)
        expect(result).toHaveLength(2)
    })

})

describe('removeFromCart', () => {

    it('should remove item from cart by id', () => {
        const cart = [
            { _id: 'esp_id', name: 'Espresso', price: 2, quantity: 1 },
            { _id: 'lat_id', name: 'Latte', price: 4, quantity: 2 },
        ]
        const result = removeFromCart(cart, 'esp_id')
        expect(result).toHaveLength(1)
        expect(result[0]._id).toBe('lat_id')
    })

    it('should return same cart if item not found', () => {
        const cart = [{ _id: 'esp_id', name: 'Espresso', price: 2, quantity: 1 }]
        const result = removeFromCart(cart, 'nonexistent_id')
        expect(result).toHaveLength(1)
    })

    it('should return empty cart when removing only item', () => {
        const cart = [{ _id: 'esp_id', name: 'Espresso', price: 2, quantity: 1 }]
        const result = removeFromCart(cart, 'esp_id')
        expect(result).toHaveLength(0)
    })

})

describe('getCartQuantity', () => {

    it('should return quantity of item in cart', () => {
        const cart = [{ _id: 'esp_id', name: 'Espresso', price: 2, quantity: 3 }]
        expect(getCartQuantity(cart, 'esp_id')).toBe(3)
    })

    it('should return 0 when item not in cart', () => {
        const cart = [{ _id: 'esp_id', name: 'Espresso', price: 2, quantity: 3 }]
        expect(getCartQuantity(cart, 'lat_id')).toBe(0)
    })

    it('should return 0 for empty cart', () => {
        expect(getCartQuantity([], 'esp_id')).toBe(0)
    })

})