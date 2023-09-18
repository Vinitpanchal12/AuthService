const UserRepository = require('../repository/userRepository');

class UserService{
    constructor(){
        this.userRepository = new UserRepository();
    }

    async create(data){
        try {
            const user = await this.userRepository.create(data);
            return user;
        } catch (error) {
            console.log("something wrong at service")
        }
    }
}
module.exports = UserService;
