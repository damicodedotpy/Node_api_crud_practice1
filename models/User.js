// ****************************JAVASCRIPT LIBRARIES******************************

// *****************************EXTERNAL LIBRARIES*******************************

const { Schema, model } = require("mongoose");

// ******************************OWN LIBRARIES***********************************

// ******************************************************************************

const UserSchema = Schema({
    internalID: {
        type: Number,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
    },
    phone: {
        type: String
    }
})

module.exports = model("User", UserSchema, "users");