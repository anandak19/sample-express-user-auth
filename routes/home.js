const express = require('express')
const router = express.Router()

router.get('/', (req, res)=>{
    if (req.session.user) {   
        res.render('home', {title: "Home", stylesheet:"home.css", user: req.session.user})
    }else{
        res.redirect('/login')
    }
})

module.exports = router

