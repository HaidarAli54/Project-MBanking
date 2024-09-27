const UserRepository = require('../repository/user.repository');
const bcrypt = require('bcrypt');
const sendEmail = require('../middleware/mail');
const generateVerifyToken = require('../middleware/jwt.config');

const {validateEmail, validateIndonesianPhoneNumber} = require('../../pkg/validation');
const { v4: uuidv4 } = require('uuid');
const sequelize = require("../../pkg/db");

const userRepository = new UserRepository();

class UserService {
    async findById(id) {
        return await userRepository.findById(id);
    }

    async create(payload) {
        const errorValidate = [];

        if(!payload.email && !payload.email === '') {
            errorValidate.push('email is required');
        }

        if(!payload.fullname && !payload.fullname === '') {
            errorValidate.push('fullname is required');
        }

        if(!payload.password && !payload.password === '') {
            errorValidate.push('password is required');
        }

        if(!payload.phone_number && !payload.phone_number === '') {
            errorValidate.push('phone_number is required');
        }

        if(!validateEmail(payload.email)) {
            errorValidate.push('email is not valid');
        }

        if(!validateIndonesianPhoneNumber(payload.phone_number)) {
            errorValidate.push('phone_number is not valid');
        }

        if(errorValidate.length > 0) {
            throw new Error(errorValidate);
        }

        const user = {
            email: payload.email,
            fullname: payload.fullname,
            phone_number: payload.phone_number,
            activation_token: uuidv4(),
            is_verified: false
        };

        const hashPassword = await bcrypt.hash(payload.password, 10);
        user.password = hashPassword;

        const transaction = await sequelize.transaction();
        try {
            const userIsExist = await userRepository.findByEmail(user.email);
            if(userIsExist) {
                throw new Error('User already registered');
            }
            const createdUser = await userRepository.create(user);

            let token = user.activation_token;

            let mail = {
                from: 'Haidar Ali <haidarali5464@gmail>',
                to: user.email,
                subject: 'pendaftaran akun untuk M-Banking',
                text:         
                "Hi, " +
                user.fullname +
                '. \n\r Silakan klik link berikut untuk menyelesaikan pendaftaran Anda. \n\r <a href="http://localhost:8080/user/verify/' +
                token +
                '">Link Daftar</a>',

            };

            sendEmail(mail);

            await transaction.commit();

            return;

        } catch (error) {
            transaction.rollback();
            console.log(error);
            throw error;

        }
        
    };

    async update(id, userUpdate) {
        return await userRepository.update(id, userUpdate);
    }

    async delete(id) {  
        return await userRepository.delete(id);
    }

    async login (email, password) {
        const user = await userRepository.findByEmail(email);

        if (!user) {
            throw new Error('User not found');
        }

        if (!user.is_verified) {
            throw new Error('User not verified');
        }
        
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            throw new Error('Password incorrect');
        }
        
        const tokenData = {
            id: user.id,
            email: user.email,
            fullname: user.fullname,
            phone_number: user.phone_number
        }
        const token = generateVerifyToken(tokenData);

        return {token, user};
    }

    async verify(token) {

        if (!token) {
            throw new Error('Token not found');
        }

        const user = await userRepository.findByToken(token);
        if (!user) {
            throw new Error('User not found');
        }

        console.log(user);

        if (user.is_verified) {
            throw new Error('User already verified');
        }

        await userRepository.update(user.id, {is_verified: true});

    }

}

module.exports = UserService