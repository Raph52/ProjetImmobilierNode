require('../../app/database.js');

const mongoose = require('mongoose');
const RealtySchema = mongoose.Schema({
    realty : {
        vendorName : { type: String },
        address : { type: String },
        suiteAdress : { type: String },
        zip: { type: String },
        infoComp: { type: String },
    },
    contact : {
        
    }
}, { versionKey: false });
 
module.exports = class Realty {
    constructor() {
        this.db = mongoose.model('Realty', RealtySchema); 
    }
 
    add(RealtyEntity) {
        console.log(RealtyEntity)
        return new Promise((resolve, reject) => {
            this.db.create(RealtyEntity, function (err, Realty) {
                if (err) reject(err);
                resolve(Realty);
            });
        });
    }
}