const express = require('express')

const tastSchema = require('./../models/tast')
const router = express.Router()

router.post('/tast/create', (req, res)=>{
    const tast = tastSchema(req.body)
    console.log(tast);
    tast.save()
    .then((data) => res.json({
        status: 200,
        data: data,
        message: 'Tast successfully resgistered'
    }))
    .catch((error) => res.json({
        status: 201,
        error: error,
        message: "Error creating tast"  
    }))
    
})

router.get('/tasts', (req, res)=>{
    
    tastSchema.find()
    .then((data) => res.json({
        status: 200,
        data: data,
        message: 'these are the tasts'
    }))
    .catch((error) => res.json({
        status: 201,
        error: error,
        message: "Error reading tasts"  
    }))
    
})

router.get('/tast/:id', (req, res)=>{
    const {id} = req.params

    tastSchema.findById(id)
    .then((data) => res.json({
        status: 200,
        data: data,
        message: 'this is the tast'
    }))
    .catch((error) => res.json({
        status: 201,
        error: error,
        message: "Error reading tast"  
    }))
    
})

router.put("/tast/:id", (req, res) => {
    const {id} = req.params
    const {state} = req.body

    tastSchema.updateOne({_id: id}, { $set: {state}})
    .then((data) => res.json(data))
    .catch((error) => res.json({message: error}))
})

router.delete("/tast/:id", (req, res)=> {
    const {id} = req.params
    tastSchema.remove({_id: id})
    .then((data) => res.json(data))
    .catch((error) => res.json({message: error}))
})

module.exports = router