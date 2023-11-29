// ****************************JAVASCRIPT LIBRARIES******************************



// *****************************EXTERNAL LIBRARIES*******************************

const mongoose = require("mongoose");
require("dotenv").config();

// ******************************OWN LIBRARIES***********************************



// ******************************************************************************

// Database connection method
const mongodbConnection = async function() {
    try {
        mongoose.connect(process.env.MONGODB_URL);
        console.log("Database successfully connected")
    } catch (error) {
        console.log(error)
        throw new Error(`There was an error while connecting to the database. Status: ${error}`)
    }
}

module.exports = {
    mongodbConnection
}