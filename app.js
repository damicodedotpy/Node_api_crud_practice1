// ******************************NATIVE LIBRARIES******************************



// ******************************EXTERNAL LIBRARIES****************************

const express = require("express");
const cors = require("cors");
require("dotenv").config();

// ******************************OWN LIBRARIES*********************************

const routes_users = require("./routes/users");
const { mongodbConnection } = require("./db");

// ****************************************************************************

// Express app instance
const app = express();


// Database connection
mongodbConnection();


// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true})); // En resumen, este middleware es necesario cuando tu aplicación Express necesita manejar datos enviados desde formularios HTML que utilizan la codificación URL-encoded. Cuando se utiliza este middleware, los datos del formulario estarán disponibles en req.body, facilitando su manipulación en las rutas y controladores de tu aplicación.


// Routes
app.use(process.env.ROUTE_PREFIX, routes_users);


// Server launcher
app.listen(process.env.PORT, function() {
    console.log("Server successfully launched");
});

