function validateUser({ name, price, stock }) {
    if (typeof name !== 'string' || name.trim() === '') {
        throw new Error('O nome do produto é obrigatório e deve ser uma string.');
    }
    if (typeof price !== 'number' || isNaN(price) || price <= 0) {
        throw new Error('O preço deve ser um número positivo válido.');
    }
    if (!Number.isInteger(stock) || stock < 0) {
        throw new Error('O estoque deve ser um número inteiro igual ou maior que zero.');
    }
}

module.exports = validateUser;