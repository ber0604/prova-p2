const AdoptionModel = require('../models/adoptionModel');
const validateAdoption = require('../utils/validateAdoption');

class AdoptionService {
    
    static async listAdoptions() {
        return await AdoptionModel.getAllAdoptions();
    }
    
    static async createAdoption(adoption) {
        validateAdoption(adoption)
        return await AdoptionModel.createAdoption(adoption);
    }

}

module.exports = AdoptionService;