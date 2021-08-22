const express = require('express')
const router = express.Router()

router.get('/notes/add', (req, res) => {
    res.render("notes/new-note")
})

router.post("/notes/new-note", (req, res) => {
    const {title, description} = req.body
    const errors = []
    if(!title){
        errors.push({text: "please write a title"})
    }
    if(!description){
        errors.push({text: "please write a description"})
    }
    if(errors.length > 0){
        res.render("notes/new-note", {
            errors,
            title,
            description
        })
    } else{
        res.send("0k")
    }
})

router.get('/notes', (req, res) => {
    res.send("notes from database")
})

module.exports = router