require('dotenv/config');
const google = require('googleapis').google;
const User = require('../models/user');

class GoogleController{

    /* Creating controller with a oath client */
    constructor(){
        this.redirectGoogleApi = this.redirectGoogleApi.bind(this);
        this.getDataFromGoogleApi = this.getDataFromGoogleApi.bind(this);
    }

    createNewOAuthClient(url){
        return new google.auth.OAuth2(
            process.env.GOOGLE_ID, 
            process.env.GOOGLE_SECRET,
            `${url}/`
        );
    }

    /* Getting oauth client and generate auth url passing scopes and redirect url */
    redirectGoogleApi(req, res){
        const defaultScope = [
            'https://www.googleapis.com/auth/userinfo.profile',
            'https://www.googleapis.com/auth/userinfo.email'
        ];
        const authUrl = this.createNewOAuthClient(req.headers.origin).generateAuthUrl({
            access_type: 'offline',
            scope: defaultScope
        });
        res.json(authUrl);
    }
    
    /* Get code and recieve data */
    async getDataFromGoogleApi(req, res){
        try{
            /* Set oauth credentials */
            const {code} = req.query;
            const auth = this.createNewOAuthClient(req.headers.origin);
            const data = await auth.getToken(code);
            auth.setCredentials(data.tokens);

            /* Get data from google */
            const test = google.oauth2({version: 'v2', auth});
            const me = await test.userinfo.get();
            const {email, name} = me.data;
            
            /* Save and get user */
            const user = await this.store({email, name}, res);

            /* Returning json with user and token */
            res.json({user: {name: user.name, email:user.email}, token: user.generateToken(user)});
        } catch(err){
            console.error(err);
            res.json({error: 'error in google callback'});
        }
    }

    /* Get and return user, if dont exist create and return user */
    async store(params, res){
        try{
            const { email, name } = params;
            let user = await User.findOne({email});
            if(!user){
                user = await User.create({email, name});
            }
            return user;
        } catch(err){
            console.error(err);
            res.json({error: 'error to save or to get user in mongo'});
        }
    }

}
module.exports =  new GoogleController();