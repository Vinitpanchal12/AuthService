const {User,Role} = require('../models/index');
const ClientError = require('../utils/clientError');
const ValidationError = require('../utils/validationError');
const {StatusCodes}= require('http-status-codes');

class UserRepository{
    async create(data){
        try {
            const user = await User.create(data);
            return user;
        } catch (error) {
            if(error.name == 'SequelizeValidationError'){
                throw new ValidationError(error);
            }
            console.log("something wrong at repository");
            throw error;
        }
    }

    async destroy(userId){
        try {
            await User.destroy({
                where:{
                    id: userId
                }
            });
            return true;
        } catch (error) {
            console.log("something wrong at repository");
            throw error;
        }
    }

    async getById(userId){
        try {
            const user = await User.findByPk(userId,{
                attributes:['email', 'id']
            });
            return user;
        } catch (error) {
            console.log("something wrong at repository");
            throw error;
        }
    }

    async getByEmail(userEmail){
        try {
            const user = await User.findOne({
                where:{
                    email: userEmail
                }
            });
            if(!user){
                throw new ClientError(
                    'AttributeNotFound',
                    'Invalid email sent in the request',
                    'please check the email, there is no record of email ',
                    StatusCodes.NOT_FOUND
                );
            }
            return user;
        } catch (error) {
            console.log("something wrong at repository");
            throw error;
        }
    }
    async isAdmin(userId){
        try {
            const user = await User.findByPk(userId);
            const adminRole = await Role.findOne({
                where:{
                    name:'ADMIN'
                }
            });
            return user.hasRole(adminRole);
        } catch (error) {
            console.log("something wrong at repository");
            throw error;
        }
    }
}

module.exports= UserRepository;