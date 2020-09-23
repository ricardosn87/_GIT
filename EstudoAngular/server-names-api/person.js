/* const { MongoClient } = require("mongodb");
const faker = require('faker');
const Person = require('./person.js');
const { Schema, Mongoose } = require("mongoose");

const url = "mongodb+srv://adminmongo:adminmongo@cluster0.emzni.azure.mongodb.net/namesdb?authSource=admin&replicaSet=atlas-fge72j-shard-0&w=majority&readPreference=primary&retryWrites=true&ssl=true"
const mongoClient = new MongoClient(url)
const dbName = "namesdb" */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var personSchema = new Schema({
    firstname: String,
    lastname: String,
    email: String,
    city: String,
    country: String
});

module.exports = mongoose.model("Person", personSchema)