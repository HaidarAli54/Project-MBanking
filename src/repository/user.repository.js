const User = require('../models/user.model');
const {UniqueConstraintError} = require('sequelize');

class UserRepository {
    async findById(id) {
        const data = await User.findByPk(id, {
            attributes: {exclude: ['password']},
        });
        if (!data) {
            throw new Error('User not found');
        }else {
        return data;
        }
    }

    async create(user) {
        try {
            user.is_verified = false;

            const createdUser = await User.create(user, {
                attributes: {exclude: ['password']},
            });

            return createdUser;

        } catch (error) {
            if (error instanceof UniqueConstraintError) {
                throw new Error('User already exists');
            } else {
                throw error;
            }
        }
    }
    async findByEmail(email) {
        return await User.findOne({
            where: {email}
        });
    }
    async update(id, userUpdate) {
        return await User.update(userUpdate, {
            where: {id},        
        });
    }
    async delete(id) {
        return await User.destroy({
            where: {id},
        });
    }
}

module.exports = UserRepository