const UserRepository = require('../repository/userRepository');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

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
    async signIn(email, plainPassword){
        try {
            // first fetch the user using email
            const user = await this.userRepository.getByEmail(email);
            // then check if the password is correct
            const passwordMatch = this.checkPassword(plainPassword, user.password);
            if(!passwordMatch){
                console.log("password doesnt match");
                throw {error: "wrong password"};
            }
            // lastly generate a jwt token for that user
            const newJwt = this.createToken({
                email: user.email,
                id: user.id
            });
            return newJwt;
        } catch (error) {
            console.log("something wrong at sign in service");
            throw error;
        }
    }

    async isAuthenticated (token){
        try {
            const response = this.verifyToken(token);
            if(!response){
                throw {error:"Invalid Token"}
            }
            const user = this.userRepository.getById(response.id);
            if(!user){
                throw {error:"no user with corresponding token"}
            }
            return user.id;
        } catch (error) {
            console.log("something wrong at authentication");
            throw error;
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

    checkPassword(userPlainPassword,encryptedPassword){
        try {
            return bcrypt.compareSync(userPlainPassword,encryptedPassword);
        } catch (error) {
            console.log("something wrong at password comparison ");
        }
    }

}
module.exports = UserService;
