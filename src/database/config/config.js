require('dotenv').config();

module.exports ={

    username: process.env.DB_USERNAME || "root",
    password: process.env.DB_PASSWORD || null,
    database: process.env.DB_DATABASE || "JWTtest",
    host: process.env.DB_HOS ||"127.0.0.1",
    port: process.env.DB_PORT,
    dialect: process.env.DB_DIALECT || "mysql",

    seederStorage: "sequelize",
    seederStorageTableName: "seeds",

    migrationStorage: "sequelize",
    migrationStorageTableName: "migrations"

};