const express = require('express')
const bodyParser = require('body-parser')
const axios = require('axios')
const app = express()
const path = require('path');
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(function(req,res,next){
    res.header('Access-Control-Allow-Origin',"*")
    res.header('Access-Control-Methods','GET,POST')
    res.header('Access-Control-Allow-Headers', 'Content-Type')
    next()
})

app.get('/',(req,res)=>{
    console.log("Welcome to sunplot")
    res.send("Hello and welcome to sunplot")
})
app.get('/query',(req,res)=>{

    let url = req.query.data
    console.log("Let call solr",url)
    if(url){
        console.log("sending request",url)
        axios.get(url).then(response => {
            if(response.data['result-set']){
                console.log("Here is the response", response.data)
                res.send(response.data)
            }

        }).catch(err=>{
            console.log("dude we hit a big one ", err)
            res.send(err)
        })
    } else {
        res.send("")
    }
})
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '..', 'build', 'index.html'));
});
app.listen(9090,()=> console.log("Starting Sunplot server on localhost on port 9090"))
