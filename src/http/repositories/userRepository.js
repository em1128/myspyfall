const Model = require('../models/index');
class UserRepository{
    constructor(){}
    async addUser(user){
        const result = await Model.User.create(user);
        return result;
    }
    async getUsers(){
        const result = await Model.User.findAll();
        return result;
    }
    
    async updateUser(user){
        const result = await Model.User.update(user,
            { where: { id: user.id } }
        );
        return result;
    }
    
    async removeUser(id){
        const result = await Model.User.destroy(
            { where: { id: id } }
        );
        return result;
    }
}
module.exports = new UserRepository();