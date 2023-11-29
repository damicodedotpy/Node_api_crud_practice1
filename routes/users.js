// ******************************NATIVE LIBRARIES******************************

// ******************************EXTERNAL LIBRARIES****************************

const express = require("express");
const router = express.Router();
require("dotenv").config();

// ******************************OWN LIBRARIES*********************************

const UserEndpoints = require("../controllers/users")

// ****************************************************************************

router.get("/home", UserEndpoints.receiveJSONdata);

router.get("/get-user/:userID", UserEndpoints.getUserData);

router.post("/post-user", UserEndpoints.postUser);

router.put("/update/:userID", UserEndpoints.updateUserData);

router.delete("/delete-all", UserEndpoints.deleteUsersData);

router.delete("/delete-user/:userID", UserEndpoints.deleteUser);


// Exports
module.exports = router;