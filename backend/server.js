import express from 'express'

const app = express()
app.get('/',(req,res)=>{
    res.send("Hello and welcome to sunplot")
})
app.get('/api/settings',(req,res)=>{
    res.json({host:'http://localhost',port:9191,collection:'films'})
})
app.use((req,res)=>{
    res.status(404).json({
        errors:{
            global:"Unable to save settings to the application"
        }
    })
})
app.listen(9090,()=> console.log("Starting Sunplot server on localhost on port 9090"))
