const User = require('../models/user');

class LoginController{
    
    async store(req, res){
        try{
            const { email, name, password } = req.body;
            let user = await User.findOne({email});
            if(!user){
                user = await User.create({email, name, password_hash: password});
            } else {
                res.json({error: 'this email already registered'});
            }
            res.json({success: 'user created'});
        } catch(err){
            console.error(err);
            res.json({error: 'error to save or to get user in mongo'});
        }
    }
    
    async index(req, res){
        try{
            const { email, password } = req.body;
            const user = await User.findOne({email});
            if (!user) {
                res.json({ error: 'email invalid' });
            }
            const isPasswordMatch = await bcrypt.compare(password, user.password_hash);
            if (!isPasswordMatch) {
                res.json({ error: 'password incorrect' });
            }
            res.json({user: {name: user.name, email:user.email}, token: user.generateToken(user)});    
        } catch(err){
            console.error(err);
            res.json({error: 'error to save or to get user in mongo'});
        }  
    }
    
}
module.exports = new LoginController();