const db = require('../config/database');

class UserModel {

    static async findByEmail(email) {
        const [rows] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
        return rows[0];
    }

    static async create(user) {
        const { name, email, password, role } = user;
        const [result] = await db.query(
            'INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)', [name, email, password, role]
        );
        return result.insertId; // Retorna o ID do usuário criado
    }

    static async getUsuarioById(id) {
        const [rows] = await db.query('SELECT id, name, email, role FROM users WHERE id = ?', [
            id,
        ]);
        return rows[0];
    }

    static async getUsers() {
        const [rows] = await db.query('SELECT id, name, email, role FROM users');
        return rows[0];
    }

    static async updateUser(id, userData) {
        const fields = [];
        const values = [];

        if (userData.name !== undefined) {
            fields.push('name = ?');
            values.push(userData.name);
        }

        if (userData.email !== undefined) {
            fields.push('email = ?');
            values.push(userData.email);
        }

        if (userData.password !== undefined) {
            fields.push('password = ?');
            const hashed = await bcrypt.hash(userData.password, 10);
            values.push(hashed);
        }

        if (userData.role !== undefined) {
            fields.push('role = ?');
            values.push(userData.role);
        }

        if (fields.length === 0) {
            throw new Error('Nenhum campo para atualizar');
        }

        const query = `UPDATE users SET ${fields.join(', ')} WHERE id = ?`;
        values.push(id);

        await db.query(query, values);
    }

    static async deleteUser(id) {
        await db.query('DELETE FROM users WHERE id = ?', [id]);
    }
    
}

module.exports = UserModel;