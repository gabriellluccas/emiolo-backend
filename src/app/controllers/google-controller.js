require('dotenv/config');
const google = require('googleapis').google;
const User = require('../models/user');

class GoogleController{

    /* Creating controller with a oath client */
    constructor(){
        this._oauth2Client = new google.auth.OAuth2(
            process.env.GOOGLE_ID, 
            process.env.GOOGLE_SECRET,
            `${process.env.APP_HOST}:${process.env.APP_PORT}${process.env.GOOGLE_REDIRECT}`
        );
        this.redirectGoogleApi = this.redirectGoogleApi.bind(this);
        this.getDataFromGoogleApi = this.getDataFromGoogleApi.bind(this);
    }

    /* Getting oauth client and generate auth url passing scopes and redirect url */
    redirectGoogleApi(req, res){
        const defaultScope = [
            'https://www.googleapis.com/auth/userinfo.profile',
            'https://www.googleapis.com/auth/userinfo.email'
        ];
        const authUrl = this._oauth2Client.generateAuthUrl({
            // access_type: 'offline',
            scope: defaultScope
        });
        res.redirect(authUrl);
    }
    
    /* Get code and recieve data */
    async getDataFromGoogleApi(req, res){
        try{
            /* Set oauth credentials */
            const {code} = req.query;
            const auth = this._oauth2Client;
            const data = await auth.getToken(code);
            auth.setCredentials(data.tokens);

            /* Get data from google */
            const test = google.oauth2({version: 'v2', auth});
            const me = await test.userinfo.get();
            const {email, name} = me.data;
            
            /* Save and get user */
            const user = await this.store({email, name}, res);

            /* Redirect to dashboard */
            res.json({user, token: user.generateToken(user)});
        } catch(err){
            console.error(err);
            res.json({error: 'error in callback'});
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
            console.log(err);
            res.json({error: 'error to save or to get user in mongo'});
        }
    }

}
module.exports =  new GoogleController();