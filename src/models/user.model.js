const { DataTypes } = require('sequelize');
const sequelize = require("../../pkg/db");

const User = sequelize.define('user', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    email: {
        type: DataTypes.STRING
    },
    fullname: {
        type: DataTypes.STRING
    },
    password: {
        type: DataTypes.STRING
    },
    phone_number: {
        type: DataTypes.STRING
    },
    activation_token: {
        type: DataTypes.STRING
    },
    is_verified: {
        type: DataTypes.BOOLEAN
    },
}, {
    sequelize: sequelize,
    timestamps: true,
    paranoid: true,
    underscored: true,
    deletedAt: 'deleted_at',
    updatedAt: 'updated_at',
    createdAt: 'created_at'
});

module.exports = User