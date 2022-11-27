const express = require('express')
const userSchema = require('./../models/user')

const router = express.Router()

router.post('/user/create', (req, res)=>{
    const user = userSchema(req.body)
    console.log(user);
    user.save()
    .then((data) => res.json({
        status: 200,
        data: data,
        message: 'User successfully resgistered'
    }))
    .catch((error) => res.json({
        status: 201,
        error: error,
        message: "Error creating user"  
    }))
    
})

router.get('/users', (req, res)=>{
    
    userSchema.find()
    .then((data) => res.json({
        status: 200,
        data: data,
        message: 'these are the users'
    }))
    .catch((error) => res.json({
        status: 201,
        error: error,
        message: "Error reading user"  
    }))
    
})

router.get('/user/:id', (req, res)=>{
    const {id} = req.params

    userSchema.findById(id)
    .then((data) => res.json({
        status: 200,
        data: data,
        message: 'this is the user'
    }))
    .catch((error) => res.json({
        status: 201,
        error: error,
        message: "Error reading user"  
    }))
    
})

router.post('/user/sigin', (req, res) => {
    const {email, password} = req.body
    const query = { email: email, password: password}
    userSchema.findOne(query)
    .then((data) => {

        if (data === null){
            res.json({
                message: "No puedes iniciar sesión"
            })
        }else {
            res.json({
                message: "Puedes iniciar sesión"
            })
        }

    })
    .catch((error) => res.json({
        status: 201,
        error: error,
        message: "User not found"
    }))
})

module.exports = router