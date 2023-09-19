const {User} = require('../models/index');

class UserRepository{
    async create(data){
        try {
            const user = await User.create(data);
            return user;
        } catch (error) {
            console.log("something wrong at repository")
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
            console.log("something wrong at repository")
        }
    }

    async getById(userId){
        try {
            const user = await User.create(userId,{
                attributes:['email', 'id']
            });
            return user;
        } catch (error) {
            console.log("something wrong at repository")
        }
    }
}

module.exports= UserRepository;