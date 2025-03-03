// const flash = require('express-flash');
const {User} = require('../models')
const bcrypt = require('bcrypt')

function renderLoginPage(req, res){
    res.render('login');
}
async function authLogIn(req, res) {
    
    const{ email, password } = req.body

    const user = await User.findOne({
        where: {
            email: email
        }
    })
    if(!user){
        req.flash('incorrect', 'Email not registered')
        return res.redirect('/login')
    }

    const isValid = await bcrypt.compare(password, user.password)
    if(!isValid){
        req.flash('incorrect', 'Incorrect Password')
        return res.redirect('/login')
    }
    
    let loggedUser = user.toJSON(); // convert obj sequelize ke obj json 

    delete loggedUser.password; // hapus password yang terbawa dari db

    req.session.user = loggedUser;
    res.redirect('/collections')
}

function renderRegisterPage(req, res){
    res.render('register')
}
async function authRegister(req, res){
    // console.log(req.body)

    // destructuring assignment req.body
    const 
    {
        username,
        email,
        password,
        confirmPassword
    } = req.body

    // check if the email is already registered
    const usedEmail = await User.findOne({
        where: {
            email: email
        }
    })
    if( usedEmail ){
        req.flash('failed', 'Email address is already registered')
        return res.redirect('/register')
    }

    // check if password n confirmation password match
    if (password != confirmPassword){
        req.flash('failed', 'Password and confirmation do not match')
        return res.redirect('/register')
    }

    // Hashing password
    const hashedPassword = await bcrypt.hash(password, 10);

    // add a new user to the database 
    await User.create({
        username,
        email,
        password: hashedPassword
    })

    req.flash('registered', 'Your account has been registered.')
    res.redirect('/login')
}

function authLogOut(req, res){
    // console.log(req.session);
    req.session.destroy(err => {
            if(err){
                console.log(err);
                return res.redirect('/register')
            }
            res.redirect('/login');
        });
}

module.exports = {
    renderRegisterPage,
    authRegister,
    renderLoginPage,
    authLogIn,
    authLogOut
    
}