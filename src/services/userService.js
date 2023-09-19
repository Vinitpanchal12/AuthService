const UserRepository = require('../repository/userRepository');
const jwt = require('jsonwebtoken');

const {JWT_KEY} = require('../config/serverConfig');

class UserService{
    constructor(){
        this.userRepository = new UserRepository();
    }

    async create(data){
        try {
            const user = await this.userRepository.create(data);
            return user;
        } catch (error) {
            console.log("something wrong at service");
        }
    }

    createToken(user){
        try {
            const result = jwt.sign(user,JWT_KEY , {expiresIn: '1d'});
            return result;
        } catch (error) {
            console.log("something wrong at token creation");
        }
    }

    verifyToken(token){
        try {
            const response = jwt.verify(token,JWT_KEY);
            return response;
        } catch (error) {
            console.log("something wrong at token verification");
        }
    }
}
module.exports = UserService;