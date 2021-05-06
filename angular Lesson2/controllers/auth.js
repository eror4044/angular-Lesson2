const User = require('../models/User')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const kees = require('../config/kees')
const errorHandler = require('../utils/errorHandler')
module.exports.login = async function (req, res) {
    const candidate = await User.findOne({
        email: req.body.email
    })
    if (candidate) {
        //проверка пароля пользователь существует
        const passwordResult = bcrypt.compareSync(req.body.password, candidate.password)
        if (passwordResult) {
            //генерация токена пароли совпали
            const token = jwt.sign({
                emeil: candidate.email,
                userId: candidate._id
            }, kees.jwt, {
                expiresIn: 60 * 60
            })
            res.status(200).json({
                token: `Bearer ${token}`
            })
        } else {
            res.status(401).json({
                message: 'пароли не совпадают'
            })
        }
    } else {
        res.status(404).json({
            message: 'User by this email is not found'
        })
    }
}

module.exports.register = async function (req, res) {
    //email password
    //синхронный запрос
    //const candidate = User.findOne({email:req.body.email})
    //асинхронный запрос
    const candidate = await User.findOne({
        email: req.body.email
    })

    if (candidate) {
        //User exist need response error
        res.status(409).json({
            message: 'Такой email уже занят пробуйте другой'
        })
    } else {

        //need create user
        const salt = bcrypt.genSaltSync(10)
        const password = req.body.password
        const user = new User({
            email: req.body.email,
            password: bcrypt.hashSync(password, salt)
        })
        try {
            await user.save()
            res.status(201).json(user)
        } catch (e) {
            errorHandler(res,e)
        }

    }



}