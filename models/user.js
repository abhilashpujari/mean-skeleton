const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');

// User Schema
const UserSchema = new Schema({
    name: {
        type: String
    },
    email : {
        type: String,
        required : true,
        unique: true
    },
    username : {
        type: String,
        required : true,
        unique: true
    },
    password : {
        type: String,
        required : true
    },
    createdOn : {
        type: Date,
        default: Date.now
    },
    updatedOn : {
        type: Date,
        default: Date.now
    }
});

UserSchema.pre('save', function(next) {
    if(this.password && this.isModified('password')) {
        var salt = bcrypt.genSaltSync(10);
        this.password = bcrypt.hashSync(this.password, salt);
        next();
    } else {
        next();
    }
});

// encrypts the given password
UserSchema.methods.setPassword = function(password) {
    var salt = bcrypt.genSaltSync(10);
    this.password = bcrypt.hashSync(password, salt);
};

UserSchema.methods.validatePassword = function(password) {
    return bcrypt.compareSync(password, this.password);
};

const User = module.exports = mongoose.model('User', UserSchema);