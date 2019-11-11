const User = require('../models/user');

class DashboardController{
    
    listUsers(req, res){
        User.find({}, (err, users) => {
            res.json(users);
        });
    }

}
module.exports = new DashboardController();