const express = require('express');
const router = express.Router();
const User = require('./user.js');
const bcrypt = require('bcryptjs');
const { Op } = require('sequelize');

// middleware
// const adminAuth = require('../middlewares/adminAuth.js');

router.get('/users', (req, res) => {
    User.findAll().then( resUsers => {
        res.render('./admin/users/index.ejs', {
            users: resUsers,
            authStatus: req.session.user
        })
    }).catch( err => {
        res.redirect('/');
    })
});

router.get('/users/new', (req, res) => {
    res.render('./admin/users/new.ejs', {
        authStatus: req.session.user
    });
})

router.post('/users/new', (req, res) => {
    
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
                        login: usrLogin,
                        email: usrEmail,
                        password: hash
                    }).then(
                        res.redirect('/admin/users')
                        // res.json(req.body)
                    );
                }
                else
                    res.render('./admin/users/new.ejs', {
                        emailStatus: 'is-invalid',
                        authStatus: req.session.user
                    })
            })
            else
                res.render('./admin/users/new.ejs', {
                    loginStatus: 'is-invalid',
                    authStatus: req.session.user
                })
    })

    
    
})
router.get('/users/login', (req, res) => {
    res.render('./admin/users/login.ejs', {
        authStatus: req.session.user
    });
})



router.get('/users/logout', (req, res) => {
        req.session.user = undefined;
        res.redirect('/');
        // CHANGE IT
        // res.send('Voce FOI DESLOGADO');
})


router.post('/users/login', (req, res) => {
    let usrLogin = req.body.usrLogin;
    let usrPassword = req.body.usrPassword;

    User.findOne({
        where: {
            [Op.or]: [
                {email: usrLogin},
                {login: usrLogin}
            ]
        }
    }).then( usrResult => {
        if(usrResult == undefined)
            // res.send('Erro ao encontrar usuario');
            res.render('./admin/users/login.ejs', {
                loginStatus: 'is-invalid',
                authStatus: req.session.user
            })
        
            // Transforma a senha passada em uma hash, e compara com a hash salva no bd(retorna boolean)
            let usrValidated = bcrypt.compareSync(usrPassword, usrResult.password);

            if(usrValidated){
                req.session.user = {
                    id: usrResult.id,
                    login: usrResult.login,
                    email: usrResult.email,
                }
                res.redirect('/admin/articles/new');
                
                // res.send(req.session.user);
            }
        
        // res.json(usrResult);
        res.render('./admin/users/login.ejs', {
            loginStatus: 'is-invalid',
            passwordStatus: 'is-invalid',
            authStatus: req.session.user
        })
    }).catch( err => {
        if(err)
            res.redirect('/');
    })
    
})


module.exports = router;