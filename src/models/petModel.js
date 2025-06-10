const db = require('../config/database');

class PetModel {

    static async getAllPets() {
        const [rows] = await db.query('SELECT * FROM pets');
        return rows;
    }

    static async getAllPetsAvailable() {
        const [rows] = await db.query('SELECT * FROM pets WHERE status = "available"');
        return rows;
    }

    static async getPetById(id) {
        const [rows] = await db.query('SELECT * FROM pets WHERE id = ?', [
            id,
        ]);
        return rows[0];
    }
    
    static async createPet({ name, age, species, size, status, descrpition }) {
        const [result] = await db.query(
            'INSERT INTO pets (name, age, species, size, status, descrpition) VALUES (?, ?, ?, ?, ?, ?)',
            [name, age, species, size, status, descrpition]
        );
        return { id: result.insertId,  name, age, species, size, status, descrpition };
    }

    static async updatePet(id, { name, age, species, size, status, descrpition }) {
        await db.query(
            'UPDATE products SET name = ?, age = ?, species = ?, size = ?, status = ?, descrpition = ? WHERE id = ?',
            [name, age, species, size, status, descrpition, id]
        );
    }

    static async deletePet(id) {
        await db.query('DELETE FROM pets WHERE id = ?', [id]);
    }
}

module.exports = PetModel;