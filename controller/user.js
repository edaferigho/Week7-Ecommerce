const express = require('express')
const User = require('../model/users')


const Router = express.Router()

Router.use(express.urlencoded({ extended: true }))
Router.use(express.json())

Router.get('/', (req, res) => {
    res.json(User)
})

//Signup Route
Router.post('/signup', (req, res) => {
    const body = req.body
    const fullName = body.fullName
    const email = body.email
    const password = body.password
    const confirmPassword = body.confirmPassword
        
    
    const foundUser = User.find((user) => {
        return user.email===email
    })
    if (foundUser) {
        res.send('Email already exist on the database')
    }
    else {
        if (password==confirmPassword) {

            const user = { id:getId(),fullName, email, password }
            User.push(user)
            res.json(user)
            
        }
        else {
            res.send('Password and confirm password are different')
        }
        
    }
})
// SignIn Route
Router.post('/signin', (req, res) => {
    const body = req.body
    const email = body.email
    const password = body.password
    const foundUser = User.find((user) => {
        return (user.email===email)&&(user.password===password)
    })
    if (foundUser) {
        res.json(foundUser)
    }
    else {
        res.send('Invalid Username or Password')
    }
})

// Function to generate User ID
function generateID() {
    let count = 0
    return () => {
        count++
        return count
    }
}
const getId = generateID()

module.exports = Router