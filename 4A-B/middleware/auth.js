function authStatus(req, res, next){
    res.locals.logged = !!req.session.user; // !! maksud nya ubah data user menjadi boolean true atau false
    next()
}
function checkAuth(requireLogin){
    return (req, res, next) => {
        if(requireLogin){
            if(!req.session.user){ //
                return res.redirect('/login') // harus login dulu
            }
        } else{
            if(req.session.user){
                return res.redirect('/dashboard') // sudah login
            }
        }
        next()
    }
}

module.exports = { authStatus, checkAuth }