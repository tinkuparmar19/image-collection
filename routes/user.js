const express = require('express')
const mongoose = require('mongoose')
const Joi = require('joi')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = mongoose.model('User')
const { JWT_KEY } = require('../config/keys')

const router = express.Router()

router.post('/signup', (req, res) => {
    console.log(req.body)
    const { error } = validateSignUp(req.body)
    if (error) return res.status(400).json({ error: error.details[0].message })

    const { name, email, password } = req.body
    User.findOne({ email: email })
        .then((saveUser) => {
            if (saveUser) return res.status(400).json({ error: 'user already registered' })
            bcrypt.hash(password, 12)
                .then(hashpassword => {
                    const user = new User({
                        name: name,
                        email: email,
                        password: hashpassword,
                    })
                    user.save()
                        .then(user => {
                            res.json({ message: 'saved successfully' })
                        })
                        .catch(err => {
                            console.log(err)
                        })
                })
        })
        .catch(e => console.log(e))
})

router.post('/login', (req, res) => {
    const { error } = validateLogin(req.body)
    if (error) return res.status(400).json({ error: error.details[0].message })

    const { email, password } = req.body
    User.findOne({ email: email })
        .then((savedUser) => {
            if (!savedUser) return res.status(400).json({ error: 'user not exist' })
            bcrypt.compare(password, savedUser.password)
                .then(match => {
                    if (match) {
                        const token = jwt.sign({ _id: savedUser._id }, JWT_KEY)
                        const { _id, name, email } = savedUser
                        res.json({ token, user: { _id, name, email } })
                    } else {
                        return res.status(400).json({ error: 'invalid email or password' })
                    }
                })
                .catch(e => console.log(e))
        })
})

const validateSignUp = (req) => {
    const schema = Joi.object({
        name: Joi.string().min(3).max(15).required(),
        email: Joi.string().min(5).max(50).required().email(),
        password: Joi.string().min(4).max(15).required()
    })
    return schema.validate(req)
}

const validateLogin = (req) => {
    const schema = Joi.object({
        email: Joi.string().min(5).max(50).required().email(),
        password: Joi.string().min(4).max(50).required()
    })
    return schema.validate(req)
}

module.exports = router