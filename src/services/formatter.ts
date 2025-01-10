const currencyFormatter = new Intl.NumberFormat('fr-CH', { style: 'currency', currency: import.meta.env.VITE_CURRENCY })

export function toCHF(number: number) {
    return currencyFormatter.format(number)
}