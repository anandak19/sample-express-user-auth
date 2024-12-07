const express = require('express')
const router = express.Router()
const authenticateUser = require('../middleware/authMiddleware')




router.get('/', (req, res)=>{
    if (req.session.user) {
        res.redirect('/')
    }else{
        res.render('login', { title: "Login page", stylesheet: "login.css", user: req.session.user, alertMessage: req.query.alertMessage})
    }
})

router.post('/submited',authenticateUser)

router.get('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return res.status(500).send('Failed to destroy session');
        }
        res.clearCookie('connect.sid')
        res.redirect('/login');
    });
});


module.exports = router


/*



*/
