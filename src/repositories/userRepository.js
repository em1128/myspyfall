const Model = require('../models/index');
class UserRepository{
    constructor(){}
    async addUser(colList){
        console.log('colList: ', colList);
        const result = await Model.User.create(colList);
        return result;
    }
    async getUsers(){
        const result = await Model.User.findAll();
        return result;
    }
}
module.exports = new UserRepository();