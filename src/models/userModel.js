const db = require('../config/database');

class UserModel {
    // Busca um usuário pelo email
    static async findByEmail(email) {
        const [rows] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
        return rows[0];
    }

    // Cria um novo usuário
    static async create(user) {
        const { name, email, password, role } = user;
        const [result] = await db.query(
            'INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)', [name, email, password, role]
        );
        return result.insertId; // Retorna o ID do usuário criado
    }

    static async getUsuarioById(id) {
        const [rows] = await db.query('SELECT * FROM users WHERE id = ?', [
            id,
        ]);
        return rows[0];
    }

    static async getUsuarioAllUsers() {
        const [rows] = await db.query('SELECT * FROM users');
        return rows[0];
    }

    static async updateUser(id, { name, email, password, role }) {
        await db.query(
            'UPDATE users SET name = ?, email = ?, password = ?, role = ? WHERE id = ?',
            [name, email, password, role, id]
        );
    }

    static async deleteUser(id) {
        await db.query('DELETE FROM users WHERE id = ?', [id]);
    }
    
}

module.exports = UserModel;