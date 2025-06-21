const AdoptionModel = require('../models/adoptionModel');

class AdoptionService {
    
    static async listAdoptions() {
        return await AdoptionModel.getAllAdoptions();
    }
    
    static async createAdoption(adoption) {
        return await AdoptionModel.createAdoption(adoption);
    }

}

module.exports = AdoptionService;