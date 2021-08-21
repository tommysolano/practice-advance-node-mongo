const express = require('express')
const router = express.Router()

router.get('/users/signin', (req, res) => {
    res.send("signin")
})

router.get('/users/signup', (req, res) => {
    res.send("formulario de autenticacion")
})

module.exports = router