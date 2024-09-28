const UserService = require('../services/user.service');
const responseHelper = require('../utils/BaseResponse');

class UserController {

    constructor() {
        this.userService = new UserService();
    }

    findById = async (req, res) => {
        try {
            const user = await this.userService.findById(req.params.id);

            if (!user) {
                return res.status(404).json(responseHelper(true, 'User not found', null));
            }

            return res.status(200).json(responseHelper(false, "success get user",user));
        } catch (error) {
            res.status(500).json(responseHelper(true, error.message, null));
        }
    }

    create = async (req, res) => {
        try {

            await this.userService.create(req.body);

            res.status(201).json(responseHelper(false, 'User created successfully', null));

        } catch (error) {
            res.status(500).json(responseHelper(true, 'user already exists', null));
        }

    }

    login = async (req, res) => {
        try {

            const { user, token } = await this.userService.login(
                req.body.email, 
                req.body.password
            );

            res.status(200).json(responseHelper( true, 'User login successfully', { user, token }));

        } catch (error) {
            if (error.message === 'User not found' || error.message === 'Password incorrect') {
                return res.status(401).json(responseHelper(false, error.message));

            } else if (error.message === 'User not verified') {
                return res.status(403).json(responseHelper(false, error.message));

            } else {
                return res.status(500).json(responseHelper(false, 'Internal Server Error', error.message));
            }       
        }
    }

    update = async (req, res) => { 
        try {

            const user = await this.userService.update(req.params.id, req.body);
            return res.status(200).json(responseHelper.success('User updated successfully',user));

        } catch (error) {
            res.status(500).json(responseHelper(false, 'internal server error',error.message));
        }
    }

    delete = async (req, res) => {
        try {
            const user = await this.userService.delete(req.params.id);
            return res.status(200).json(responseHelper(false,'User deleted successfully',user));
        } catch (error) {
            res.status(500).json(responseHelper(false, 'internal server error',error.message));
        }
    }

    verify = async (req, res) => {
        try {

            const token = req.params.token;
            if (!token) {
                return res.status(400).json(responseHelper(true,'Token is required', null));
            }   
            const userVerified = await this.userService.verify(token);

            return res.status(200).json(responseHelper(false,'User verified',userVerified));
            
        } catch (error) {

            if (error.message === 'User not found') {
                return res.status(404).json(responseHelper(true, 'User not found', null));
            }

            res.status(500).json(responseHelper(false, 'internal server error', error.message));
        }
    }
}

module.exports = UserController