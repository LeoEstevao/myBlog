const express = require('express');
const router = express.Router();
const User = require('./user.js');
const bcrypt = require('bcryptjs');
const { Op } = require('sequelize');

// middleware
const adminAuth = require('../middlewares/adminAuth.js');

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
router.get('/users/login', (req, res) => {
    res.render('./admin/users/login.ejs');
})



router.get('/users/logout', (req, res) => {
        req.session.user = undefined;
        // CHANGE IT
        res.send('Voce FOI DESLOGADO');
})


router.post('/users/login', (req, res) => {
    let usrLogin = req.body.usrLogin;
    let usrPassword = req.body.usrPassword;

    User.findOne({
        where: {
            [Op.or]: [
                {EMAIL: usrLogin},
                {LOGIN: usrLogin}
            ]
        }
    }).then( usrResult => {
        if(usrResult == undefined)
            // res.send('Erro ao encontrar usuario');
            res.render('./admin/users/login.ejs', {
                loginStatus: 'is-invalid'
            })
        
            // Transforma a senha passada em uma hash, e compara com a hash salva no bd(retorna boolean)
            let usrValidated = bcrypt.compareSync(usrPassword, usrResult.PASSWORD);

            if(usrValidated){
                req.session.user = {
                    id: usrResult.ID,
                    login: usrResult.LOGIN,
                    email: usrResult.EMAIL,
                }
                // res.redirect('/');
                res.send(req.session.user);
            }
        
        // res.json(usrResult);
        res.render('./admin/users/login.ejs', {
            loginStatus: 'is-invalid',
            passwordStatus: 'is-invalid'
        })
    }).catch( err => {
        res.redirect('/');
    })
    
})


module.exports = router;