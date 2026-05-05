const { types } = require('joi');
const mongooes = require('mongoose');
const Schema = mongooes.Schema;


const UserSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        inique: true,
    },
    password: {
        type: String,
        required: true,
    }
},
    {
        timestamps: true,     
        versionKey: false     
    }

);


const UserModel = mongooes.model('User', UserSchema);
module.exports = UserModel;




