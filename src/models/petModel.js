const db = require('../config/database');

class PetModel {
  static async getAllPets() {
    const [rows] = await db.query('SELECT * FROM pets');
    return rows;
  }

  static async getAllPetsAvailable() {
    const [rows] = await db.query(
      'SELECT * FROM pets WHERE status = "available"'
    );
    return rows;
  }

  static async getPetById(id) {
    const [rows] = await db.query('SELECT * FROM pets WHERE id = ?', [id]);
    return rows[0];
  }

  static async createPet({ name, age, species, size, status, description }) {
    const [result] = await db.query(
      'INSERT INTO pets (name, age, species, size, status, description) VALUES (?, ?, ?, ?, ?, ?)',
      [name, age, species, size, 'available', description]
    );
    return {
      id: result.insertId,
      name,
      age,
      species,
      size,
      status,
      description,
    };
  }

  static async updatePet(id, petData) {
    const fields = [];
    const values = [];

    if (petData.name !== undefined) {
      fields.push('name = ?');
      values.push(petData.name);
    }

    if (petData.age !== undefined) {
      fields.push('age = ?');
      values.push(petData.age);
    }

    if (petData.species !== undefined) {
      fields.push('species = ?');
      values.push(petData.species);
    }

    if (petData.size !== undefined) {
      fields.push('size = ?');
      values.push(petData.size);
    }

    if (petData.status !== undefined) {
      fields.push('status = ?');
      values.push(petData.status);
    }

    if (petData.description !== undefined) {
      fields.push('description = ?');
      values.push(petData.description);
    }

    if (fields.length === 0) {
      throw new Error('Nenhum campo para atualizar');
    }

    const query = `UPDATE pets SET ${fields.join(', ')} WHERE id = ?`;
    values.push(id);

    await db.query(query, values);
  }

  static async updateStatusPet(id, status) {
    await db.query('UPDATE pets SET status = ? WHERE id = ?', [status, id]);
  }

  static async deletePet(id) {
    await db.query('DELETE FROM pets WHERE id = ?', [id]);
  }
}

module.exports = PetModel;
