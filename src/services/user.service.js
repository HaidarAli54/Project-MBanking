const UserRepository = require('../repository/user.repository');
const bcrypt = require('bcrypt');
const sendEmail = require('../middleware/mail');
const { 
    generateVerifyToken,
    verifyToken
 } = require('../middleware/jwt.config');

const userRepository = new UserRepository();

class UserService {
    async findById(id) {
        return await userRepository.findById(id);
    }

    async create(user) {
        const hashPassword = await bcrypt.hash(user.password, 10);
        user.password = hashPassword;

        const createdUser = await userRepository.create(user);

        let token = generateVerifyToken(createdUser.id);

        let mail = {
            from: 'Haidar Ali <haidarali5464@gmail>',
            to: user.email,
            subject: 'pendaftaran akun untuk M-Banking',
            text:         
            "Hi, " +
            user.username +
            '. \n\r Silakan klik link berikut untuk menyelesaikan pendaftaran Anda. \n\r <a href="http://localhost:3000/api/v1/mail/verify/' +
            token +
            '">Link Daftar</a>',

        };

        const sendResult = sendEmail(mail);

        return sendResult;
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
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            throw new Error('Password incorrect');
        }
        
        const token = generateVerifyToken(user.id);

        return {token, user};
    }

    async verify(id) {
        const token = verifyToken(id);

        const verify = await this.userRepository.verify(token);
        
        return verify
    }
}

module.exports = UserService