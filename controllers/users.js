// ****************************JAVASCRIPT LIBRARIES******************************



// *****************************EXTERNAL LIBRARIES*******************************

const express = require("express");
const { response } = require("express");
require("dotenv").config();

// ******************************OWN LIBRARIES***********************************

const User = require("../models/User");

// ******************************************************************************

// Get and store all users data
const receiveJSONdata = async (request, response) => {
    // Get list of JSON objects from the external API
    const data = await fetch(process.env.JSONPLACEHOLDER_URL + "/users")
    .then((result) => result.json())
    .then((result) => result)
    .catch((error) => {throw new Error(`There was an error while getting the API JSON data. Status: ${error}`)});

    // Create a new user entry by JSON object
    try {
        for (let user of data) {
            const {id:internalID, name, email, phone} = user;
            const newUser = new User({internalID:internalID,
                                        name:name,
                                        email:email, 
                                        phone:phone});
            newUser.save();
        }
        return response.status(200).json({
            message: "Users created successfully"
        })
    } catch (error) {
        throw new Error(`There was an error while inserting the new data. Status: ${error}`)
    }
}

// Update a selected user's data
const updateUserData = async (request, response) => {
    const userID = request.params.userID;

    // Check if the user actually exists
    try {
        if(await User.findById({"_id": userID}) === null) {
            throw new Error
        }
    } catch (error) {
        return response.status(500).json({
            message: `The user could not have been found. Status: ${error}`
        });
    };

    // Update the user data
    try {
        const newData = request.body;

        await User.findByIdAndUpdate({"_id": userID}, {$set: newData})
        return response.status(200).json({
            message: "User info successfully updated"
        });
    } catch (error) {
        return response.status(500).json({
            message: `There was an error trying to update the user info. Status: ${error}`
        });
    }
}

// Delete a selected user
const deleteUser = async (request, response) => {
    const userID = request.params.userID;

    // Check if the user actually exist
    try {
        if(await User.findById({"_id": userID}) === null) {
            throw new Error
        }
    } catch (error) {
        return response.status(500).json({
            message: `The user could not have been found. Status: ${error}`
        });
    }

    // Find user and delete it
    try {
        await User.findByIdAndDelete({"_id": userID});
        return response.status(200).json({
            message: "User successfully deleted"
        });
    } catch (error) {
        return response.status(500).json({
            message: `There was an error trying to delete de user. Status ${error}`
        });
    };
};

// Get a selected user's data
const getUserData = async (request, response) => {
    // Get user ID from URL
    const userID = request.params.userID;

    // Return the user data if it actually exist or raise an error if not
    try {
        const user = await User.findById({"_id": userID});
        if(user === null) {
            throw new Error
        } else {
            return response.status(200).json({
                user
            })
        }
    } catch (error) {
        return response.status(500).json({
            message: `The user could not have been found. Status: ${error}`
        });
    };
};

// Delete all users data
const deleteUsersData = async (request, response) => {
    await User.deleteMany({});
    return response.status(200).json({
        message: "Collection data successfully deleted"
    });
};

// Post a new user
const postUser = async (request, response) => {
    // Get new user data
    const userData = request.body;

    // Create new user and store it
    try {
        const newUser = await User.create(userData);
        return response.status(200).json({
            message: "User successfully created",
            newUser
        });
    } catch (error) {
        return response.status(500).json({
            message: `There was an error trying to create the new user. Status: ${error}`
        });
    };
};


// Exports
module.exports = {
    receiveJSONdata,
    deleteUsersData,
    updateUserData,
    getUserData,
    deleteUser,
    postUser
}