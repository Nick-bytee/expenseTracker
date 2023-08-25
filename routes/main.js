const express = require('express')
const path = require('path')
const router = express.Router()

router.get('/signIn', (req, res) => {
    res.sendFile(path.join( __dirname, 'views','signUp.html'))
})


module.exports = router