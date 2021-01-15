const express = require('express');
const router = express.Router();
const User = require('./user.js');
const bcrypt = require('bcryptjs');

router.get('/users', (req, res) => {
    User.findAll().then( resUsers => {
        res.render('./admin/users/index.ejs', {
            users: resUsers
        })
    }).catch( err => {
        res.redirect('/');
    })
});

router.get('/users/create', (req, res) => {
    res.render('./admin/users/create.ejs');
})

router.post('/users/create', (req, res) => {
    
    let usrLogin = req.body.usrLogin;
    let usrEmail = req.body.usrEmail;
    let usrPassword = req.body.usrPassword;


    User.findAndCountAll({
        where: {
            LOGIN: usrLogin
        }
    }).then( resLogin => {
        if(resLogin.count == 0)
        User.findAndCountAll({
                where: {
                    EMAIL: usrEmail
                }
            }).then( resEmail => {
                if(resEmail.count == 0){
                    let salt = bcrypt.genSaltSync(10);
                    let hash = bcrypt.hashSync(usrPassword, salt);
                    User.create({
                        LOGIN: usrLogin,
                        EMAIL: usrEmail,
                        PASSWORD: hash
                    }).then(
                        res.redirect('/admin/users')
                        // res.json(req.body)
                    );
                }
                else
                    res.render('./admin/users/create.ejs', {
                        emailStatus: 'is-invalid'
                    })
            })
            else
                res.render('./admin/users/create.ejs', {
                    loginStatus: 'is-invalid'
                })
    })



})
module.exports = router;