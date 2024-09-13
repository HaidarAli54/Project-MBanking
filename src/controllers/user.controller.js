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
            res.status(500).json(responseHelper.error(error.message));
        }
    }

    create = async (req, res) => {
        try {

            await this.userService.create(req.body);

            res.status(201).json(responseHelper(false, 'User created successfully', null));

        } catch (error) {
            res.status(500).json(responseHelper(true, error.message, null));
        }

    }

    login = async (req, res) => {
        try {
            const { user, token } = await this.userService.login(
                req.body.email, 
                req.body.password
            );
            const data = { user, token };

            if (!data) {
                return res
                .status(404)
                .json(responseHelper('User not found'));
            }
        } catch (error) {

            res.status(500).json(responseHelper.error(error.message));
            
        }
    }

    update = async (req, res) => { 
        try {

            const user = await this.userService.update(req.params.id, req.body);
            return res.status(200).json(responseHelper.success('User updated successfully',user));

        } catch (error) {
            res.status(500).json(responseHelper.error(error.message));
        }
    }

    delete = async (req, res) => {
        try {
            const user = await this.userService.delete(req.params.id);
            return res.status(200).json(responseHelper.success('User deleted successfully',user));
        } catch (error) {
            res.status(500).json(responseHelper.error(error.message));
        }
    }

    verify = async (req, res) => {
        try {
            const userVerifried = await this.userService.verify(req.params.id);
            return res.status(200).json(responseHelper.success('User verified successfully',userVerifried));
        } catch (error) {
            res.status(500).json(responseHelper(true, error.message, null));
        }
    }
}

module.exports = UserController