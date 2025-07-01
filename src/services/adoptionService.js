const AdoptionModel = require('../models/adoptionModel');
const validateAdoption = require('../utils/validateAdoption');
const PetModel = require('../models/petModel');

class AdoptionService {
    
    static async listAdoptions() {
        return await AdoptionModel.getAllAdoptions();
    }
    
    static async createAdoption(adoption) {
        validateAdoption(adoption)
        const date = new Date();
        adoption.adoption_date = date.toISOString().split('T')[0]; // Formata a data para YYYY-MM-DD
        AdoptionModel.createAdoption(adoption);
        
        // Atualiza o status do pet para 'adopted'
        return await PetModel.updateStatusPet(adoption.pet_id, 'adopted'); 
    }

}

module.exports = AdoptionService;