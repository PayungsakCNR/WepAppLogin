// load the things we need
var mongoose = require('mongoose');
var bcrypt = require('bcrypt');

// define the schema for our user model
var userSchema = mongoose.Schema({

    local: {
        email: String,
        password: String,
        isAdmin: Boolean,
        role: {type: String, enum: ['ADMIN', 'USER'], default: 'USER'},
    },
    facebook: {
        id: String,
        token: String,
        email: String,
        name: String
    },
    twitter: {
        id: String,
        token: String,
        displayName: String,
        username: String
    },
    google: {
        id: String,
        token: String,
        email: String,
        name: String
    }

});

// methods ======================
// generating a hash
userSchema.methods.generateHash = function (password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8));
};

// checking if password is valid
userSchema.methods.validPassword = function (password) {
    return bcrypt.compareSync(password, this.local.password);
};
userSchema.methods.isAdmin = function (){
    
}

// create the model for users and expose it to our app
module.exports = mongoose.model('User', userSchema);