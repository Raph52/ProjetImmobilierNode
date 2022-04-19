require('../../app/database.js');

const mongoose = require('mongoose');
const slug = require('mongoose-slug-updater');
mongoose.plugin(slug);



const RealtySchema = mongoose.Schema({
    realty : {
        seller : { type: String },
        address1 : { type: String },
        suiteAdress : { type: String },
        address2: { type: String },
        zipcode: { type: String },
        suiteAdress : { type: String },
        zip: { type: String },
        city: { type: String },
        type : { type: String },
        price : { type: String },
        info_address : { type: String },
        amount_commission : { type: String },
        percentage_commission : { type: String },
        photos : { type: String },
        area : { type: String },
        room : { type: String },
        type_product : { type: String },
        
    },
    contact : {
        civility : { type: String },
        lastname : { type: String },
        firstname : { type: String },
        email : { type: String },
        mobile : { type: String },
        phone : { type: String },
        info : { type: String },
    },
    slug: { type: String, slug: ['address.zipcode','address.city'], unique:true },
}, { versionKey: false });
 
module.exports = class Realty {
    constructor() {
        this.db = mongoose.model('Realty', RealtySchema); 
    }

    find(search = {}) {
        return new Promise((resolve, reject) => {
            this.db.find(search, function (err, realty) {
                if (err) reject(err);
                resolve(realty);
            });
        });
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

    delete(filter = {}) {
        return new Promise((resolve, reject) => {
            this.db.deleteOne(filter, function (err) {
                if (err) reject(err);
                resolve();
            });
        });
    }

    
}