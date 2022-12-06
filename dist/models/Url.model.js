"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initURLmodel = exports.Url2 = void 0;
const sequelize_1 = require("sequelize");
class Url2 extends sequelize_1.Model {
}
exports.Url2 = Url2;
const initURLmodel = (sequelize) => {
    Url2.init({
        id: {
            type: sequelize_1.DataTypes.STRING,
            autoIncrement: false,
            primaryKey: true
        },
        largeUrl: sequelize_1.DataTypes.STRING
    }, {
        sequelize // Instance of sequelize that reflects the connection
    });
};
exports.initURLmodel = initURLmodel;
