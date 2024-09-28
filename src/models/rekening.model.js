const { DataTypes } = require('sequelize');
const sequelize = require("../../pkg/db");

const Rekening = sequelize.define('rekening', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    id_user: {
        type: DataTypes.INTEGER
    },
    no_rekening: {
        type: DataTypes.STRING
    }, 
    saldo: {
        type: DataTypes.INTEGER
    },
    status: {
        type: DataTypes.BOOLEAN
    }
}, {
    sequelize: sequelize,
    timestamps: true,
    paranoid: true,
    underscored: true,
    deletedAt: 'deleted_at',
    updatedAt: 'updated_at',
    createdAt: 'created_at'
});


module.exports = Rekening