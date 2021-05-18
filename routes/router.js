const express = require('express')
const router = express.Router() 
const schema = require('../models/listSchema')
const Todo = schema;

router.get('/tasks', async (req, res) => {
    try{
        const tasks = await Todo.find()
        // console.log(res.json(tasks))
        res.json(tasks)
    }
    catch (err){
        res.status(500).json({message: err.message})
    }
    // console.log(req)
})


router.post('/tasks', async (req, res, next) => {
    // console.log('Request is '+ req.body.task);
     var list = new Todo( {
         task: req.body.task,
         status: false
     })
    //  console.log('I am here '+ list)
    try{
        const putData = await list.save()
        // console.log('Data ' + putData)
        res.status(201).send(putData)
    }catch(err){
        res.send({message: err})
    }
})


router.delete('/tasks', (req,res) => {
    // console.log(req.body)
    try{
        Todo.findOneAndRemove({_id: req.body._id},(err) => {
            if(err)
            throw err
            res.json({message: "Data of given ID is deleted"})
        })
    }catch(err){
        res.status(500).json({message: err.message})
    }
})

router.patch('/tasks', (req,res) => {
    try{
        Todo.updateOne({_id:req.body._id},{
            $set : {name:req.body.name}
        },(err) => {
            if(err)
            throw error
            res.json({message: "Data updated"})
        })
    }catch(err){
        res.status(500).json({message: err.message})
    }
})

module.exports = router
