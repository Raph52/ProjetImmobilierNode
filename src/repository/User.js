require('../../app/database.js');

const mongoose = require('mongoose');
const UserSchema = mongoose.Schema({
    email : {  type: String },
    password : { type: String },
    civility : {type: String, match: /^[1-2]{1}$/},
    firstname: { type: String },
    lastname: { type: String },
    phone: { type: String},
    roles: { type: Array },
    date: { type: Date, default: Date.now }
}, { versionKey: false });
 
module.exports = class User {
    constructor() {
        this.db = mongoose.model('User', UserSchema); 
    }
 
    add(userEntity) {
        return new Promise((resolve, reject) => {
            this.db.create(userEntity, function (err, user) {
                if (err) reject(err);
                resolve(user);
            });
        });
    }

    emailExists(email) {
        return new Promise((resolve, reject) => {
            this.db.findOne({ email }, (err, user) => {
                // si pas d'erreur, email trouvé
                if (!err && user !== null) {
                   resolve(true);
                }  
                resolve(false);
            })
        })
    }

    getUserByEmail(email) {
        return new Promise((resolve, reject) => {
            this.db.findOne({ email }, (err, user) => {
                // si pas d'erreur, email trouvé
                if (!err && user !== null) {
                   resolve(user);
                }  
                reject(false);
            })
        })
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

