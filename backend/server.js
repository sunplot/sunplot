import express from 'express'
import fs from 'fs'

const app = express()
app.get('/',(req,res)=>{
    res.send("Hello and welcome to sunplot")
})
app.get('/api/settings',(req,res)=>{
    res.json({host:'http://localhost',port:8983,collection:'films'})
})
app.use((req,res)=>{

    // res.status(200).json({msg:"saved"})
    res.status(404).json({
        errors:{
            global:"Unable to save settings to the application"
        }
    })
})
app.listen(9090,()=> console.log("Starting Sunplot server on localhost on port 9090"))
