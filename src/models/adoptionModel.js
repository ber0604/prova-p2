const db = require('../config/database');

class AdoptionModel {

    static async getAllAdoptions() {
        const [rows] = await db.query('SELECT * FROM adoptions');
        return rows;
    }
    
    static async createAdoption({ pet_id, user_id, adoption_date }) {
        const [result] = await db.query(
            'INSERT INTO adoptions (pet_id, user_id, adoption_date) VALUES (?, ?, ?)',
            [pet_id, user_id, adoption_date]
        );
        return { id: result.insertId, pet_id, user_id, adoption_date };
    }

}

module.exports = AdoptionModel;